/*
 * Copyright (C) Zeeve Inc.
 * This file is part of Larch.
 * Larch is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Larch is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with Larch.  If not, see <http://www.gnu.org/licenses/>.
 */

import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { ExecRun, Intention } from './models/exec_run.js';

export const spawnObjList: Map<string, ChildProcessWithoutNullStreams> = new Map();

export const removeInProgressNetwork = (networkName: string): void => {
  if (!spawnObjList.has(networkName)) return;
  const spawnContext = spawnObjList.get(networkName);
  spawnContext?.kill('SIGINT');
  spawnObjList.delete(networkName);
};

export const execute = async (
  runId: string | undefined,
  commandBinPath: string,
  commandArguments: Array<string>,
  intention: Intention,
  relatedId: string | null,
  wait: boolean,
) => {
  const command = `${commandBinPath} ${commandArguments.join(' ')}`;
  const execRun = new ExecRun(runId);
  await execRun.addMinimalInfo(command, intention, relatedId);
  console.log(command);
  const spawnZombienet = (): Promise<{
    code: number | null, stdout: Buffer, stderr: Buffer
  } | null> => new Promise((resolve, reject) => {
    const result = spawn(commandBinPath, [...commandArguments]);
    if ((intention === 'NETWORK_CREATE' || intention === 'NETWORK_TEST') && relatedId) {
      spawnObjList.set(relatedId, result);
    }
    let stderrChunks: Array<Uint8Array> = [];
    let stdoutChunks: Array<Uint8Array> = [];
    result.stderr.on('data', (data) => {
      if (!wait) resolve(null);
      stderrChunks = stderrChunks.concat(data);
      const stderr = Buffer.concat(stderrChunks).toString('base64');
      execRun.updateStdError(stderr);
    });
    result.stderr.on('end', () => {
      const stderr = Buffer.concat(stderrChunks).toString('base64');
      execRun.updateStdError(stderr);
    });
    result.stdout.on('data', (data) => {
      if (!wait) resolve(null);
      stdoutChunks = stdoutChunks.concat(data);
      const stdout = Buffer.concat(stdoutChunks).toString('base64');
      execRun.updateStdOutput(stdout);
    });
    result.stdout.on('end', () => {
      const stdout = Buffer.concat(stdoutChunks).toString('base64');
      execRun.updateStdOutput(stdout);
    });
    result.on('exit', async (code) => {
      if (relatedId) spawnObjList.delete(relatedId);
      await execRun.updateStateCode(code !== null ? code : -1);
      if (wait) {
        resolve({
          code,
          stdout: Buffer.concat(stdoutChunks),
          stderr: Buffer.concat(stderrChunks),
        });
      }
    });
    result.on('error', (error) => {
      console.log('error occurred');
      reject(error);
    });
  });
  const execResult = await spawnZombienet();
  if (execResult) {
    const { code, stderr, stdout } = execResult;
    console.debug(await execRun.get());
    return {
      code, stderr, stdout, runId,
    };
  }
  return {
    code: null, stderr: null, stdout: null, runId,
  };
};

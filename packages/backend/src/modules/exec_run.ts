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
  commandArguments: string,
  intention: Intention,
  relatedId: string | null,
  wait: boolean,
) => {
  const command = `${commandBinPath} ${commandArguments}`;
  const execRun = new ExecRun(runId);
  await execRun.addMinimalInfo(command, intention, relatedId);
  console.log(command);
  const spawnZombienet = (): Promise<{
    code: number | null, stdout: Buffer, stderr: Buffer
  } | null> => new Promise((resolve, reject) => {
    const result = spawn(commandBinPath, [...commandArguments.trim().split(' ')]);
    if ((intention === 'NETWORK_CREATE' || intention === 'NETWORK_TEST') && relatedId) {
      spawnObjList.set(relatedId, result);
    }
    let stderrChunks: Array<Uint8Array> = [];
    let stdoutChunks: Array<Uint8Array> = [];
    result.stderr.on('data', (data) => {
      if (!wait) resolve(null);
      stderrChunks = stderrChunks.concat(data);
      const stderr = Buffer.concat(stderrChunks).toString();
      execRun.updateStdError(stderr);
    });
    result.stderr.on('end', () => {
      const stderr = Buffer.concat(stderrChunks).toString();
      execRun.updateStdError(stderr);
    });
    result.stdout.on('data', (data) => {
      if (!wait) resolve(null);
      stdoutChunks = stdoutChunks.concat(data);
      const stdout = Buffer.concat(stdoutChunks).toString();
      execRun.updateStdOutput(stdout);
    });
    result.stdout.on('end', () => {
      const stdout = Buffer.concat(stdoutChunks).toString();
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

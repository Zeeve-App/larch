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

import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { execute } from '../exec_run.js';
import { checkPathExists } from '../../utils/fs_helper.js';

export const getNamespace = async (networkDirectory: string): Promise<string> => {
  const data = await fs.readFile(path.join(networkDirectory, 'namespace'), 'utf-8');
  return JSON.parse(data).metadata.name;
};

export const cleanUp = async (namespace: string, networkId: string): Promise<void> => {
  const args = [
    'pod',
    'ps',
    '-f',
    `label=zombie-ns=${namespace}`,
    '--format',
    '{{.Name}}',
  ];
  const { code, stdout } = await execute(undefined, 'podman', args, 'NETWORK_CLEANUP', networkId, true);
  if (code !== 0 || stdout === null) return;
  const removePodArgs = ['pod', 'rm', '-f', ...stdout.toString('utf-8').trim().split('\n').map((pod) => pod.trim())];
  const { code: removePodCode } = await execute(
    undefined,
    'podman',
    removePodArgs,
    'NETWORK_CLEANUP',
    networkId,
    true,
  );
  console.log({ removePodCode });
  // now remove the network
  const removeNetworkArgs = ['network', 'rm', namespace];
  const { code: removeNetworkCode } = await execute(
    undefined,
    'podman',
    removeNetworkArgs,
    'NETWORK_CLEANUP',
    networkId,
    true,
  );
  console.log({ removeNetworkCode });
};

export const deleteDirUnshare = async (dirPath: string, networkName: string): Promise<void> => {
  const args = ['unshare', 'rm', '-r', dirPath];
  const { code } = await execute(undefined, 'podman', args, 'NETWORK_CLEANUP', networkName, true);
  if (code !== 0) throw new Error('Not able to deleted directory');
};

export const checkZombieJson = async (
  networkDirectory: string,
): Promise<boolean> => checkPathExists(
  path.join(networkDirectory, 'zombie.json'),
);

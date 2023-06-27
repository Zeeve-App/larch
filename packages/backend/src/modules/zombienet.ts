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
import { constants } from 'node:fs';
import { ZOMBIENET_BIN_COLLECTION_DIR, ZOMBIENET_BINARY_DOWNLOAD_BASE_URL } from '../config.js';
import { downloadFileToAPath } from '../utils/download.js';
import { checkPathExists } from '../utils/fs_helper.js';
import { Intention } from './models/exec_run.js';
import { execute } from './exec_run.js';

type ZombienetCliOptions = {
  spawn?: boolean,
  test?: boolean,
  networkConfigPath?: string,
  testConfigPath?: string,
  provider?: 'podman' | 'native' | 'kubernetes',
  dir?: string,
  version?: boolean
};

const zombienetBinNameByVersion = (zombienetVersion: string): string => `zombienet-${zombienetVersion}`;
const zombienetBinPathByVersion = (
  zombienetVersion: string,
): string => `${ZOMBIENET_BIN_COLLECTION_DIR}/${zombienetBinNameByVersion(zombienetVersion)}`;

export const downloadZombienetBinary = async (zombienetVersion: string): Promise<void> => {
  const binaryDownloadUrl = `${ZOMBIENET_BINARY_DOWNLOAD_BASE_URL}/v${zombienetVersion}/zombienet-linux-x64`;
  const binaryVersionedPath = zombienetBinPathByVersion(zombienetVersion);
  await fs.mkdir(ZOMBIENET_BIN_COLLECTION_DIR, { recursive: true });
  await downloadFileToAPath({
    downloadUrl: binaryDownloadUrl,
    filePath: binaryVersionedPath,
    progressRefreshInMs: 400,
    progressCb: (fileSize, currentFileSize) => {
      console.log(`Total file size: ${fileSize}, Current file size: ${currentFileSize}, Percent downloaded: ${((currentFileSize / fileSize) * 100).toFixed(2)}`);
    },
  });
};

export const executePermissionToBinary = async (zombienetVersion: string): Promise<void> => {
  const binaryVersionedPath = zombienetBinPathByVersion(zombienetVersion);
  await fs.chmod(binaryVersionedPath, constants.S_IRUSR | constants.S_IWUSR | constants.S_IXUSR);
};

const checkAndDownloadZombienetBinary = async (zombienetVersion: string): Promise<void> => {
  const binaryVersionedPath = zombienetBinPathByVersion(zombienetVersion);
  const pathExists = await checkPathExists(binaryVersionedPath);
  if (pathExists) return;
  console.debug(`Downloading Zombienet binary with version: ${zombienetVersion}`);
  await downloadZombienetBinary(zombienetVersion);
  console.debug('Downloading of Zombienet binary is completed');
  console.debug('Providing execute permission to Zombienet binary');
  await executePermissionToBinary(zombienetVersion);
  console.debug('Done providing execute permission to Zombienet binary');
};

export const generateZombienetCliOptions = (zombienetCliOptions: ZombienetCliOptions): Array<string> => {
  const optionsList: Array<string> = [];
  if (zombienetCliOptions.version) {
    optionsList.push('version');
    return optionsList;
  }

  if (zombienetCliOptions.spawn) {
    optionsList.push('spawn');
    optionsList.push(zombienetCliOptions.networkConfigPath ?? '');
  } else if (zombienetCliOptions.test) {
    optionsList.push('test');
    optionsList.push(zombienetCliOptions.testConfigPath ?? '');
  }

  if (zombienetCliOptions.provider) {
    optionsList.push('--provider');
    optionsList.push(zombienetCliOptions.provider);
  }

  if (zombienetCliOptions.dir) {
    optionsList.push('--dir');
    optionsList.push(zombienetCliOptions.dir);
  }

  optionsList.push('--force');

  return optionsList;
};

export const runZombienet = async (
  zombienetCliOptions: ZombienetCliOptions,
  zombienetVersion: string,
  runId: string,
  networkId: string,
): Promise<void> => {
  await checkAndDownloadZombienetBinary(zombienetVersion);
  const compiledCliOptions = generateZombienetCliOptions(zombienetCliOptions);
  const zombienetBinPath = zombienetBinPathByVersion(zombienetVersion);
  const intention: Intention = zombienetCliOptions.spawn ? 'NETWORK_CREATE' : 'NETWORK_TEST';
  await execute(runId, zombienetBinPath, compiledCliOptions, intention, networkId, false);
};

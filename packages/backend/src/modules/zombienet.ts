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
import { spawnSync } from 'node:child_process';
import {
  ZOMBIENET_BIN_COLLECTION_DIR,
  ZOMBIENET_BINARY_DOWNLOAD_BASE_URL,
  ZOMBIENET_PATCH_BINARY_DOWNLOAD_BASE_URL,
} from '../config.js';
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
const zombienetBinContextPath = (): string => `${ZOMBIENET_BIN_COLLECTION_DIR}/context.json`;

const getPodmanCurrentAndAvailableVersion = async (): Promise<{
  current: string,
  available: string
}> => {
  const podmanVersions = {
    current: '3',
    available: '3',
  };
  try {
    await fs.mkdir(ZOMBIENET_BIN_COLLECTION_DIR, { recursive: true });
    const pathExists = await checkPathExists(zombienetBinContextPath());
    if (pathExists) {
      const data = await fs.readFile(zombienetBinContextPath(), 'utf-8');
      const contextJSON = JSON.parse(data);
      if (contextJSON.podmanVersion) podmanVersions.current = contextJSON.podmanVersion;
    } else {
      const contextJSON = {
        podmanVersion: podmanVersions.current,
      };
      await fs.writeFile(zombienetBinContextPath(), JSON.stringify(contextJSON), 'utf-8');
    }
    const execInfo = spawnSync('podman', ['version', '--format', 'json']);
    const availablePodmanInfo = JSON.parse(execInfo.stdout?.toString('utf-8'));
    const majorVersion = availablePodmanInfo.Client.Version.split('.')[0];
    podmanVersions.available = majorVersion;
  } catch (error) {
    console.warn('Error fetching podman version', error);
  }
  return podmanVersions;
};

export const downloadZombienetBinary = async (zombienetVersion: string, podmanVersion: string): Promise<void> => {
  const downloadBinaryFileSlugName = process.platform === 'darwin' ? 'zombienet-macos' : 'zombienet-linux-x64';
  const binaryDownloadUrl = !podmanVersion || podmanVersion === '3'
    ? `${ZOMBIENET_BINARY_DOWNLOAD_BASE_URL}/v${zombienetVersion}/${downloadBinaryFileSlugName}`
    : `${ZOMBIENET_PATCH_BINARY_DOWNLOAD_BASE_URL}/v${zombienetVersion}-podman4-patch/${downloadBinaryFileSlugName}`;
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
  const contextJSON = {
    podmanVersion,
  };
  await fs.writeFile(zombienetBinContextPath(), JSON.stringify(contextJSON), 'utf-8');
};

export const executePermissionToBinary = async (zombienetVersion: string): Promise<void> => {
  const binaryVersionedPath = zombienetBinPathByVersion(zombienetVersion);
  await fs.chmod(binaryVersionedPath, constants.S_IRUSR | constants.S_IWUSR | constants.S_IXUSR);
};

const checkAndDownloadZombienetBinary = async (zombienetVersion: string): Promise<void> => {
  const binaryVersionedPath = zombienetBinPathByVersion(zombienetVersion);
  const pathExists = await checkPathExists(binaryVersionedPath);
  const {
    current: currentPodmanVersion,
    available: availablePodmanVersion,
  } = await getPodmanCurrentAndAvailableVersion();
  if (pathExists && currentPodmanVersion === availablePodmanVersion) return;
  console.debug(`Downloading Zombienet binary with version: ${zombienetVersion}`);
  await downloadZombienetBinary(zombienetVersion, availablePodmanVersion);
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

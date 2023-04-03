import * as fs from 'node:fs/promises';
import { constants } from 'node:fs';
import { spawn } from 'node:child_process';
import { ZOMBIENET_BIN_COLLECTION_DIR, ZOMBIENET_BINARY_DOWNLOAD_BASE_URL } from '../config.js';
import { downloadFileToAPath } from '../utils/download.js';
import { checkPathExists } from '../utils/fs_helper.js';
import { ExecRun } from './models/exec_run.js';
// import { getRunId } from './network.js';

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
const zombienetBinPathByVersion = (zombienetVersion: string): string => `${ZOMBIENET_BIN_COLLECTION_DIR}/${zombienetBinNameByVersion(zombienetVersion)}`;

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

const generateZombienetCliOptions = (zombienetCliOptions: ZombienetCliOptions): string => {
  const optionsList: Array<string> = [];
  if (zombienetCliOptions.version) {
    optionsList.push(' version');
    return optionsList.join('');
  }

  if (zombienetCliOptions.spawn) {
    optionsList.push(` spawn ${zombienetCliOptions.networkConfigPath}`);
  } else if (zombienetCliOptions.test) {
    optionsList.push(` test ${zombienetCliOptions.testConfigPath}`);
  }

  if (zombienetCliOptions.provider) {
    optionsList.push(` --provider ${zombienetCliOptions.provider}`);
  }

  if (zombienetCliOptions.dir) {
    optionsList.push(` --dir ${zombienetCliOptions.dir}`);
  }

  return optionsList.join('');
};

export const runZombienet = async (
  zombienetCliOptions: ZombienetCliOptions,
  zombienetVersion: string,
  runId: string,
): Promise<void> => {
  await checkAndDownloadZombienetBinary(zombienetVersion);
  const compiledCliOptions = generateZombienetCliOptions(zombienetCliOptions);
  const zombienetBinPath = zombienetBinPathByVersion(zombienetVersion);
  const command = `${zombienetBinPath} ${compiledCliOptions}`;
  const execRun = new ExecRun(runId);
  await execRun.addMinimalInfo(command);
  const spawnZombienet = () => new Promise((resolve, reject) => {
    console.log(command);
    const result = spawn(zombienetBinPath, [...compiledCliOptions.trim().split(' ')]);
    let stderrChunks: Array<Uint8Array> = [];
    let stdoutChunks: Array<Uint8Array> = [];
    result.stderr.on('data', (data) => {
      resolve(null);
      stderrChunks = stderrChunks.concat(data);
      const stderr = Buffer.concat(stderrChunks).toString();
      execRun.updateStdError(stderr);
    });
    result.stderr.on('end', () => {
      const stderr = Buffer.concat(stderrChunks).toString();
      execRun.updateStdError(stderr);
    });
    result.stdout.on('data', (data) => {
      resolve(null);
      stdoutChunks = stdoutChunks.concat(data);
      const stdout = Buffer.concat(stdoutChunks).toString();
      execRun.updateStdOutput(stdout);
    });
    result.stdout.on('end', () => {
      const stdout = Buffer.concat(stdoutChunks).toString();
      execRun.updateStdOutput(stdout);
    });
    result.on('exit', async (code) => {
      await execRun.updateStateCode(code || -1);
    });
    result.on('error', (error) => {
      console.log('error occurred');
      reject(error);
    });
  });
  await spawnZombienet();
  console.debug(await execRun.getRunInfo());
};

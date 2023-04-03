import * as fs from 'node:fs/promises';
// import * as fileHandeler from 'node:fs';
import { Network } from './models/network.js';
import { createDir } from '../utils/fs_helper.js';
import { LARCH_CONTEXT_DIR } from '../config.js';
import { ExecRun } from './models/exec_run.js';

export const getRunId = async (id: string): Promise<string> => id;

export const updateNetworkStatus = async (id: any): Promise<void> => {
  const network = new Network();
  const execRun = new ExecRun(id);
  const statusCode = await execRun.showNetworkState(id);
  let state: string = 'in-progress';
  if (statusCode === 0) {
    state = 'running';
  }
  if (statusCode === 1) {
    state = 'failed';
  }
  await network.updateStatus(id, state);
};

export const showNetwork = async (
  networkName: string,
): Promise<void> => {
  const network = new Network();
  const result = await network.displayNetworkByNetworkName(networkName);
  return result;
};

export const runZombienetForTest = async (
  networkName: string,
): Promise<void> => {
  const network = new Network();
  const result = await network.testNetwork(networkName);
  return result;
};

export const addNetworkInfo = async (
  id: any,
  name: string,
  config_filename: string,
  config_content: string,
  network_directory: string,
  network_provider: string,
  test_filename: string,
  test_content: string,
): Promise<void> => {
  const network = new Network();
  const result = await network.addAllNetworkInfo(
    id,
    name,
    config_filename,
    config_content,
    network_directory,
    network_provider,
    test_filename,
    test_content,
  );
  return result;
};

export const createDirectory = async (
  networkName: string,
  confFileName: string,
  confFileData: string,
): Promise<void> => {
  const networksDirPath = `${LARCH_CONTEXT_DIR}/networks`;
  await createDir(networksDirPath);
  const networkDirPath = `${networksDirPath}/${networkName}`;
  await createDir(networkDirPath);
  const myBuffer = Buffer.from(confFileData, 'base64');
  await fs.writeFile(`${networkDirPath}/${confFileName}`, myBuffer);
};

export const createTestDirectory = async (
  networkName: string,
  testFileName: string,
  testFileData: string,
): Promise<void> => {
  const networksDirPath = `${LARCH_CONTEXT_DIR}/networks`;
  await createDir(networksDirPath);
  const networkDirPath = `${networksDirPath}/${networkName}`;
  await createDir(networkDirPath);
  const myBuffer = Buffer.from(testFileData, 'base64');
  await fs.writeFile(`${networkDirPath}/${testFileName}`, myBuffer);
};

export const displayZombienetRunOutput = async (
  networkId: string,
): Promise<void> => {
  const execRun = new ExecRun(networkId);
  const result = await execRun.getRunInfoById(networkId);
  return result;
};

export const displayZombienetTestRunOutput = async (
  networkId: string,
): Promise<void> => {
  const execRun = new ExecRun(networkId);
  const result = await execRun.getRunInfoById(networkId);
  return result;
};

export const updateWithConfig = async (
  networkName: string,
  dslFileName: string,
  dslFile: string,
  fileName: string,
  confFile: string,
): Promise<void> => {
  const network = new Network();
  const result = await network.updateNetworkInfoWithConfigFile(
    networkName,
    dslFileName,
    dslFile,
    fileName,
    confFile,
  );
  return result;
};

export const updateWithoutConfig = async (
  networkName: string,
  dslFileName: string,
  dslFile: string,
  fileName: string,
): Promise<void> => {
  const network = new Network();
  const result = await network.updateNetworkInfoWithoutConfigFile(
    networkName,
    dslFileName,
    dslFile,
    fileName,
  );
  return result;
};

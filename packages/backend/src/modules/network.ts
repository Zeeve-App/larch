import * as fs from 'node:fs/promises';
import { Network } from './models/network.js';
import { createDir } from '../utils/fs_helper.js';
import { LARCH_CONTEXT_DIR } from '../config.js';
import { ExecRun } from './models/exec_run.js';

export const showNetwork = async (
  networkName: string,
): Promise<void> => {
  const network = new Network();
  const result = await network.displayNetworkByNetworkName(networkName);
  return result;
};

export const addNetworkInfo = async (
  name: string,
  config_filename: string,
  config_content: string,
  network_directory: string,
  network_provider: string,
  network_state: string,
  test_filename: string,
  test_content: string,
): Promise<void> => {
  const network = new Network();
  const result = await network.addAllNetworkInfo(
    name,
    config_filename,
    config_content,
    network_directory,
    network_provider,
    network_state,
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

export const displayZombienetRunOutput = async (
  networkId: string,
): Promise<void> => {
  const execRun = new ExecRun(networkId);
  const result = await execRun.getRunInfoById(networkId);
  return result;
};

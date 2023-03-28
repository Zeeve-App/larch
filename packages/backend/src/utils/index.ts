import * as fs from 'fs';
import { LARCH_CONTEXT_DIR, ZOMBIENET_VERSION } from '../config.js';
import {
  downloadZombienetBinary, executePermissionToBinary,
  createNetworksDir, createDirectoryInsideNetworkDir,
  manageNetworkJson, addIntoNetworksDirectory,
  runZombienet, zombieBinaryAlreadyExist,
} from './zombienetRunner.js';
import { checkNetworkDirExists, matchFileName, runTest } from './testZombienetRunner.js';

export const startZombienet = async (dirName: string, fileName: string, networkName: string, confFile: string, dslFileName: string, dslFile: string) => {
  try {
    console.log('Welcome to Zombienet binary');
    const binDirectory = `${LARCH_CONTEXT_DIR}/bin`;

    if (fs.existsSync(binDirectory)) {
      console.log('Directory exists!');
      await zombieBinaryAlreadyExist(dirName, fileName, networkName, confFile, ZOMBIENET_VERSION, dslFileName, dslFile);
    } else {
      console.log('Directory not found.');

      await downloadZombienetBinary(ZOMBIENET_VERSION);
      await executePermissionToBinary(ZOMBIENET_VERSION);
      await createNetworksDir();
      await createDirectoryInsideNetworkDir(networkName);
      await addIntoNetworksDirectory(fileName, confFile, networkName, ZOMBIENET_VERSION);
      await runZombienet(dirName, fileName, networkName, confFile, ZOMBIENET_VERSION);
      await manageNetworkJson(dirName, fileName, networkName, confFile, ZOMBIENET_VERSION, dslFileName, dslFile);
    }
  } catch (error) {
    console.error(error);
  }
};

export const testZombienet = async (
  networkName: string,
  fileName: string,
  dslFileName: string,
) => {
  try {
    await checkNetworkDirExists(networkName, dslFileName);
    await matchFileName(fileName, dslFileName);
    await runTest(dslFileName, ZOMBIENET_VERSION, networkName);
  } catch (error) {
    console.log(error);
  }
};

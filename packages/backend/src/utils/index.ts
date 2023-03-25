import * as util from 'node:util';
import * as cmd from 'node:child_process'
import * as fs from 'fs'
import { LARCH_CONTEXT_DIR, VERSION } from './declaration.js';
import {
    downloadZombienetBinary, executePermissionToBinary,
    createNetworksDir, createDirectoryInsideNetworkDir,
    manageNetworkJson, addIntoNetworksDirectory,
    runZombienet, zombieBinaryAlreadyExist
} from './zombienetRunner.js';

const exec = util.promisify(cmd.exec);

export const startZombienet = async (dirName: string, fileName: string, networkName: string, confFile: string) => {
    try {
        console.log("Welcome to Zombienet binary")

        const binDirectory = `${LARCH_CONTEXT_DIR}/bin`;
        if (fs.existsSync(binDirectory)) {
            console.log('Directory exists!')
            await zombieBinaryAlreadyExist(dirName, fileName, networkName, confFile, VERSION);
        } else {
            console.log('Directory not found.');
            await downloadZombienetBinary(VERSION);
            await executePermissionToBinary(VERSION);
            await createNetworksDir();
            await createDirectoryInsideNetworkDir(networkName);
            await addIntoNetworksDirectory(fileName, confFile, networkName, VERSION);
            await runZombienet(dirName, fileName, networkName, confFile, VERSION);
            await manageNetworkJson(dirName, fileName, networkName, confFile, VERSION);
        }
    }
    catch (error) {
        console.error(error);
    }
}
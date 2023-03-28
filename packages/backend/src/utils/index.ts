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
import { checkNetworkDirExists, matchFileName, runTest } from './testZombienetRunner.js';

export const startZombienet = async (dirName:string,fileName:string,networkName:string,confFile:string,dslFileName:string,dslFile:string) => {

    try {
        console.log("Welcome to Zombienet binary")
        const binDirectory = `${LARCH_CONTEXT_DIR}/bin`;

        if (fs.existsSync(binDirectory)) {
            console.log('Directory exists!')
            await zombieBinaryAlreadyExist(dirName,fileName,networkName,confFile,VERSION,dslFileName,dslFile)

          } else {

            console.log('Directory not found.')

                await downloadZombienetBinary( VERSION );
                await executePermissionToBinary( VERSION );
                await createNetworksDir();
                await createDirectoryInsideNetworkDir(networkName);
                await addIntoNetworksDirectory(fileName,confFile,networkName,VERSION,dslFileName,dslFile);
                await runZombienet(dirName,fileName,networkName,confFile,VERSION);
                await manageNetworkJson (dirName,fileName,networkName,confFile,VERSION,dslFileName,dslFile);                                          
        }
    }
    catch (error) {
        console.error(error);
    }
};

export const testZombienet = async (networkName:string,fileName:string,dslFileName:string,dslFile:string) => {

    try {

        await checkNetworkDirExists(networkName,dslFileName);
        await matchFileName(fileName,dslFileName)
        await runTest(dslFileName,VERSION,networkName)
        
    } catch (error) {

        console.log(error)
        
    }

   

};

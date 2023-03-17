import * as util  from 'node:util';
import * as cmd from 'node:child_process'
import * as fs from 'fs'
import { LOCATION, VERSION } from './declearation.js';
import { downloadZombienetBinary, renameBinary, executePermissionToBinary, createNetworkDir, createDirectoryInsideNetworkDir, manageNetworkJson, addIntoNetworksDirectory, runZombienet, zombieBinaryAlreadyExist } from './zombienetRunner.js';

const exec = util.promisify(cmd.exec);

// dirName:string,fileName:string,networkName:string,confFile:string
export const startZombienet = async (dirName:string,fileName:string,networkName:string,confFile:string) => {

    console.log("from zombienet-installer");

    console.log("Welcome to Zombienet binary")

        let commandArr = [];
        commandArr.push(LOCATION);
        commandArr.push('/bin')

        const dir = commandArr.join("");

        if (fs.existsSync(dir)) {
            console.log('Directory exists!')
            await zombieBinaryAlreadyExist(dirName,fileName,networkName,confFile,VERSION)

          } else {
            console.log('Directory not found.')

                await downloadZombienetBinary( VERSION )

                await renameBinary( VERSION );

                await executePermissionToBinary( VERSION );

                await createNetworkDir( VERSION );

                await createDirectoryInsideNetworkDir(networkName)

                await manageNetworkJson (dirName,fileName,networkName,confFile,VERSION); 

                await addIntoNetworksDirectory(fileName,confFile,networkName,VERSION);
                       
                await runZombienet(dirName,fileName,networkName,confFile,VERSION);
                                                 
        }
    }

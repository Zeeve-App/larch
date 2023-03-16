import { createDirectory } from "./createDirectory.js";
import * as util  from 'node:util';
import * as cmd from 'node:child_process'
import * as fs from 'fs'
import { LOCATION, VERSION } from "../utils/declearation.js";
import { directoryAlreadyExist } from "./directoryAlreadyExists.js";
// const readFileAsync = util.promisify(fs.readFile);
// const writeFileAsync = util.promisify(fs.writeFile);

const exec = util.promisify(cmd.exec);

export const startNetwork = async (dirName:string,fileName:string,networkName:string,confFile:string) => {

        console.log("from zombienet-installer");

        console.log("Welcome to Zombienet binary")

        let command = [];
        command.push(LOCATION);
        command.push('/zombienet');
        command.push('-');
        command.push(VERSION);
        command.push('/javascript/packages/cli/dist')

        const dir = command.join("");

        if (fs.existsSync(dir)) {
            console.log('Directory exists!')

            await directoryAlreadyExist(dirName,fileName,networkName,confFile)
                


          } else {
            console.log('Directory not found.')
            await createDirectory(dirName,fileName,networkName,confFile);

          }
        
}

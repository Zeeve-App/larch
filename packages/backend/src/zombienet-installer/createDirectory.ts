import * as util  from 'node:util';
import * as cmd from 'node:child_process'
import { createNetworks } from './manageNetworks.js';
import { LOCATION, VERSION } from "../utils/declearation.js";

const exec = util.promisify(cmd.exec);


export const createDirectory = async (dirName:string,fileName:string,networkName:string,confFile:string) => {
    try {

        let commandArr = [];
        commandArr.push('mkdir ');
        commandArr.push(LOCATION);
        commandArr.push(' && cd ');
        commandArr.push(LOCATION);
        commandArr.push(' && mkdir networks');

        const command = commandArr.join("");

            console.log("From create directory")

            const { stdout,stderr } = await exec(command);

            await createNetworks(dirName,fileName,networkName,confFile)
    } catch (error) {
        console.error(error);
    }
}
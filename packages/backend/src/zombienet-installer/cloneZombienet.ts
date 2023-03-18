import { createBinary } from "./buildBinary.js";
import * as util  from 'node:util';
import * as cmd from 'node:child_process'
const exec = util.promisify(cmd.exec);
import { LOCATION, VERSION } from "../utils/declearation.js";

export const cloneRepo = async (dirName:string,fileName:string,networkName:string,confFile:string) => {
    try {

            let commandArr = [];
            commandArr.push('cd && cd ');
            commandArr.push(LOCATION);
            commandArr.push(' && git clone git@github.com:paritytech/zombienet.git && cd zombienet && git checkout tags/v');
            commandArr.push(VERSION);
            let command = commandArr.join("");

        console.log("cloning into zombienet...");
    const { stdout, stderr } = await exec(command);
    console.log("cloning done..");

    let excCommandArr = [];
    excCommandArr.push('cd && mv ');
    excCommandArr.push(LOCATION);
    excCommandArr.push('/zombienet ');
    excCommandArr.push(LOCATION);
    excCommandArr.push('/zombienet');
    excCommandArr.push('-');
    excCommandArr.push(VERSION);

    const excCommand = excCommandArr.join("");

    const {  } = await exec(excCommand);
    
    await createBinary(dirName,fileName,networkName,confFile);
    } catch (error) {
        console.error(error);
    }
}
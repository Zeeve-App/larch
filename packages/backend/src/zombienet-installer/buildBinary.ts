import { zombienetRun } from "./runZombienet.js";
import * as util  from 'node:util';
import * as cmd from 'node:child_process'
import { LOCATION, VERSION } from "../utils/declearation.js";
import * as fs from 'fs'
const exec = util.promisify(cmd.exec);


export const createBinary = async (dirName:string,fileName:string,networkName:string,confFile:string) => {
    try {

        let commandArr = [];
        commandArr.push('cd && cd ');
        commandArr.push(LOCATION);
        commandArr.push('/zombienet');
        commandArr.push('-');
        commandArr.push(VERSION);
        commandArr.push('/javascript && npm install && npm run build');

        const command = commandArr.join("")

        console.log("Building Binary");
    const { stdout, stderr } = await exec(command);
    console.log("Binary Built Successfully ..."); 

        let new1 = LOCATION+'/networks/'
        let newLocation = new1+fileName;
        console.log(newLocation);
        newLocation = newLocation.replace(/(\r\n|\n|\r)/gm, "");

        const myBuffer = Buffer.from(confFile, 'base64');

        fs.appendFile(newLocation, myBuffer, function (err){
            if (err) throw err;
            console.log('Saved!');
        });

        await zombienetRun(dirName,fileName,networkName,confFile);
        
    } catch (error) {
        console.error(error);
    }
}
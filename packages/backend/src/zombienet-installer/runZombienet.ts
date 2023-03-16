import * as util  from 'node:util';
import * as cmd from 'node:child_process'
const exec = util.promisify(cmd.exec);
import { LOCATION, VERSION } from "../utils/declearation.js";

export const zombienetRun = async (dirName:string,fileName:string,networkName:string,confFile:string) => {
    try {
        
        console.log("Zombienet Start Running")

        let commandArr = [];
        commandArr.push('cd && cd ');
        commandArr.push(LOCATION);
        commandArr.push('/zombienet');
        commandArr.push('-');
        commandArr.push(VERSION);
        commandArr.push('/javascript/packages/cli && node dist/cli.js -p podman spawn ');
        commandArr.push(LOCATION);
        commandArr.push("/networks/");
        commandArr.push(fileName);
        commandArr.push(' -d ');
        commandArr.push(dirName);

        const command = commandArr.join("");
        
        const { stdout, stderr } = await exec(command);
        console.log(stdout)
        console.log(stderr)

        console.log("Zombienet Running")


    } catch (error) {
        console.error(error);
    }
}
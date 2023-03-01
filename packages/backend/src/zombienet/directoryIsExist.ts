import { cloneRepo } from "./cloneZombienet.js";
// import { exec } from 'node:child_process';
// import { podmanCheck } from "./checkPodman.js"
import * as util  from 'node:util';
import * as cmd from 'node:child_process'
const exec = util.promisify(cmd.exec);

export const directoryIsExist = async (a:string,b:string|undefined) => {
    try {
        let str1 = a;
        let str2 = b;
        console.log("checking for file parity-zeeve-zombienet ...");
    
    const { stdout, stderr } = await exec('cd && rm -rf parity-zeeve-zombienet');
    
    // console.log('stdout:', stdout);
    // console.error('stderr:', stderr);
    // cloneRepo();
    cloneRepo (str1,str2);
    } catch (error) {
        
    }
}
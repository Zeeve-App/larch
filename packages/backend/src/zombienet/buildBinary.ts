import { zombienetRun } from "./runZombienet.js";
// import {exec} from 'node:child_process';
import * as util  from 'node:util';
import * as cmd from 'node:child_process'
const exec = util.promisify(cmd.exec);
// const exec = util.promisify(require('node:child_process').exec);
// const util = require('node:util');
// // const { zombienetRun } = require('./runZomienet');
// const exec = util.promisify(require('node:child_process').exec);

// import { podmanCheck } from "./checkPodman.js"

export const createBinary = async (a:string,b:string|undefined) => {
    try {
        let str1 = a;
        let str2 = b;
        console.log("Building Binary");
    const { stdout, stderr } = await exec('cd && cd parity-zeeve-zombienet/zombienet/javascript && npm install && npm run build');
    console.log("Binary Built Successfully ...");
    // console.log('stdout:', stdout);
    // console.error('stderr:', stderr);
        // podmanCheck
        zombienetRun(str1,str2);
    } catch (error) {
        
    }
}
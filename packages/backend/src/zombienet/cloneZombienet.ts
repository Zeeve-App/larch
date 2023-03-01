import { createBinary } from "./buildBinary.js";
// import {exec} from 'node:child_process';
import * as util  from 'node:util';
import * as cmd from 'node:child_process'
const exec = util.promisify(cmd.exec);
// const exec = util.promisify(require('node:child_process').exec);

// import { podmanCheck } from "./checkPodman.js"

export const cloneRepo = async (a:string,b:string|undefined) => {
    try {
        let str1 = a;
        let str2 = b;
        console.log("cloning into zombienet...");
    const { stdout, stderr } = await exec('cd && mkdir parity-zeeve-zombienet && cd parity-zeeve-zombienet && git clone git@github.com:paritytech/zombienet.git && cd zombienet && git checkout tags/v1.3.34');
    console.log("cloning done..");
    // console.log('stdout:', stdout);
    // console.error('stderr:', stderr)
    // createBinary();
    createBinary(str1,str2);
    } catch (error) {
        
    }
}
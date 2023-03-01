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
const { stdout, stderr } = await exec('echo $USER');
// where to store the networks
let init:string = '/home/';
let username:string = stdout;
let location = init+username+'/.larch'
location = location.replace(/(\r\n|\n|\r)/gm, "");

let c1 = 'cd && cd ';
let c2 = location;
let c3 = '/zombienet/javascript && npm install && npm run build'
let command = c1+c2+c3;
command = command.replace(/(\r\n|\n|\r)/gm, "");
// console.log(command);

export const createBinary = async (a:string,b:string|undefined) => {
    try {
        let str1 = a;
        let str2 = b;
        console.log("Building Binary");
    const { stdout, stderr } = await exec(command);
    console.log("Binary Built Successfully ...");
    // console.log('stdout:', stdout);
    // console.error('stderr:', stderr);
        // podmanCheck
        zombienetRun(str1,str2);
        // zombienetRun();
    } catch (error) {
        console.error(error);
    }
}
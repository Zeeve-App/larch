
// import {exec} from 'node:child_process';
import { createBinary } from "./buildBinary.js";
import * as util  from 'node:util';
import * as cmd from 'node:child_process'
const exec = util.promisify(cmd.exec);
// const exec = util.promisify(require('node:child_process').exec);

// import { podmanCheck } from "./checkPodman.js"
// import { createNetwork } from './createNetworks.js';


const { stdout, stderr } = await exec('echo $USER');
// where to store the networks
let init:string = '/home/';
let username:string = stdout;
let location = init+username+'/.larch'
// let last:string = '/larch-cli/backend/networks/';
// let location:string = init+username+last;
location = location.replace(/(\r\n|\n|\r)/gm, "");
// console.log(location);

let c1 = 'cd && cd ';
let c2 = location;
let c3 = ' && git clone git@github.com:paritytech/zombienet.git && cd zombienet && git checkout tags/v1.3.37'
let command = c1+c2+c3;
command = command.replace(/(\r\n|\n|\r)/gm, "");
// console.log(command);


export const cloneRepo = async (arg1:string,arg2:string,arg3:string,arg4:string) => {
    try {
        // let str1 = a;
        // let str2 = b;
            let str1 = arg1;
            let str2 = arg2;
            let str3 = arg3;
            let str4 = arg4;

            // console.log("from cloneZombienet");
            // console.log(str1);
            // console.log(str2);
            // console.log(str3);
            // console.log(str4);
            // console.log("From cloneZombienet")

        console.log("cloning into zombienet...");
    const { stdout, stderr } = await exec(command);
    console.log("cloning done..");
    // console.log('stdout:', stdout);
    // console.error('stderr:', stderr)
    // createBinary();
    
    // createBinary()
    // createNetwork(str1,str2);
    await createBinary(str1,str2,str3,str4);
    } catch (error) {
        console.error(error);
    }
}
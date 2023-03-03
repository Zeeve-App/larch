import { zombienetRun } from "./runZombienet.js";
// import {exec} from 'node:child_process';
import * as util  from 'node:util';
import * as cmd from 'node:child_process'
const exec = util.promisify(cmd.exec);
// var fs = require('fs');
import * as fs from 'fs'
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

export const createBinary = async (arg1:string,arg2:string,arg3:string,arg4:string) => {
    try {
        let str1 = arg1;
        let str2 = arg2;
        let str3 = arg3;
        let str4 = arg4;

        // console.log("from Binaryuild");
        // console.log(str1);
        // console.log(str2);
        // console.log(str3);
        // console.log(str4);
        // console.log("From Binaryuild");


        console.log("Building Binary");
    const { stdout, stderr } = await exec(command);
    console.log("Binary Built Successfully ...");
    // console.log('stdout:', stdout);
    // console.error('stderr:', stderr);
        // podmanCheck
        // zombienetRun(str1,str2);
        

        let new1 = location+'/networks/'
        let newLocation = new1+str2;
        console.log(newLocation);
        newLocation = newLocation.replace(/(\r\n|\n|\r)/gm, "");

        const myBuffer = Buffer.from(str4, 'base64');
        
        // console.log(myBuffer);

        fs.appendFile(newLocation, myBuffer, function (err){
            if (err) throw err;
            console.log('Saved!');
        });
        await zombienetRun(str1,str2,str3,str4);
    } catch (error) {
        console.error(error);
    }
}


// export const insertNetwork = async () => {
    
//         let newLocation = location+'/networks'
//         newLocation = newLocation.replace(/(\r\n|\n|\r)/gm, "");

//         fs.appendFile(newLocation, 'Hello content!', function (err:Error) {
//             if (err) throw err;
//             console.log('Saved!');
//         });
// }
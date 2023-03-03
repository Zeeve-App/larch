import * as util  from 'node:util';
import * as cmd from 'node:child_process'
import { cloneRepo } from './cloneZombienet.js';
const exec = util.promisify(cmd.exec);

const { stdout, stderr } = await exec('echo $USER');
let init:string = '/home/';
let username:string = stdout;
let last:string = '/.larch/';
let location:string = init+username+last;
location = location.replace(/(\r\n|\n|\r)/gm, "");

let c1 = 'mkdir '
let c2 = location
let c3 = ' && cd '
let c4 = location
let c5 = ' && mkdir networks'
let command = c1+c2+c3+c4+c5;
command = command.replace(/(\r\n|\n|\r)/gm, "");



export const createDirectory = async (arg1:string,arg2:string,arg3:string,arg4:string) => {
    try {
            let str1 = arg1;
            let str2 = arg2;
            let str3 = arg3;
            let str4 = arg4;

            // console.log("from createDirectory");
            // console.log(str1);
            // console.log(str2);
            // console.log(str3);
            // console.log(str4);
            console.log("From create directory")

            const {stdout,stderr } = await exec(command);
            await cloneRepo(str1,str2,str3,str4);
    } catch (error) {
        
    }
}
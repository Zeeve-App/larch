import { Request } from "express";
import * as util  from 'node:util';
import * as cmd from 'node:child_process'
const exec = util.promisify(cmd.exec);

import  multer  from "multer";
type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const { stdout, stderr } = await exec('echo $USER');
// const { stdout, stderr } = await exec('echo $USER');
// console.log("stdout:" + stdout);

// where to store the networks
let init:string = '/home/';
let username:string = stdout;
let last:string = '/.larch/';
let location:string = init+username+last;
location = location.replace(/(\r\n|\n|\r)/gm, "");
// mkdir location && cd location && mkdir networks

let c1 = 'mkdir '
let c2 = location
let c3 = ' && cd '
let c4 = location
let c5 = ' && mkdir networks'
let command = c1+c2+c3+c4+c5;
command = command.replace(/(\r\n|\n|\r)/gm, "");

const { } = await exec(command);

let newLocation = location + "/networks"
newLocation = newLocation.replace(/(\r\n|\n|\r)/gm, "");
// console.log(location);
export const storage = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        cb: DestinationCallback
    ): void => {
        
        cb(null, newLocation);
    },
    filename: (
        req: Request,
        file: Express.Multer.File,
        cb: FileNameCallback
    ): void => {
        // let newName = Date.now()+ '-'+ file.originalname;
        cb(null,file.originalname);
    }
})
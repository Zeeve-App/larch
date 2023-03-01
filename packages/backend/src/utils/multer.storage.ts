import { Request } from "express";
import * as util  from 'node:util';
import * as cmd from 'node:child_process'
const exec = util.promisify(cmd.exec);

import  multer  from "multer";
type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const { stdout, stderr } = await exec('echo $USER');
// console.log("stdout:" + stdout);

// where to store the networks
let init:string = '/home/';
let username:string = stdout;
let last:string = '/larch-cli/backend/networks/';
let location:string = init+username+last;
location = location.replace(/(\r\n|\n|\r)/gm, "");
// console.log(location);
export const storage = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        cb: DestinationCallback
    ): void => {
        
        cb(null, location);
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
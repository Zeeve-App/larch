import * as fs from 'fs'
import * as util  from 'node:util';
import * as cmd from 'node:child_process'
import { cloneRepo } from './cloneZombienet.js';
const exec = util.promisify(cmd.exec);

const { stdout, stderr } = await exec('echo $USER');
let init:string = '/home/';
let username:string = stdout;
let last:string = '/.larch/networks.json';
let location:string = init+username+last;
location = location.replace(/(\r\n|\n|\r)/gm, "");

// fs.appendFile(location, myBuffer, function (err){
//     if (err) throw err;
//     console.log('Saved!');
// });



export const createNetworks = async (arg1:string,arg2:string,arg3:string,arg4:string) => {

    try {
            let str1 = arg1;
            let str2 = arg2;
            let str3 = arg3;
            let str4 = arg4;

            const networkValue = {
                name: str3,
                dirName : str1,
                fileName : str2,
                confFile : str4
            }

            // const myJSON = JSON.stringify(networkValue);

            let emptyArr = [] ;

            emptyArr.push(networkValue)

             const myJSON = JSON.stringify(emptyArr);

            // emptyArr.push(myJSON)

            fs.appendFile(location, myJSON, function (err){
                if (err) throw err;
                    console.log('Empty array created');
            });

            // fs.appendFile(location, emptyArr.push(), function (err){
            //     if (err) throw err;
            //         console.log('Empty array created');
            // });
            // console.log(myJSON);
            await cloneRepo(str1,str2,str3,str4);
    } catch (error) {
        
    }
    
}
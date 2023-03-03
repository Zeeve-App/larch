// import { podmanCheck } from "./checkPodman.js"
// import { cloneRepo } from "./cloneZombienet.js";
// import { directoryIsExist } from "./directoryIsExist.js"

import { createDirectory } from "./createDirectory.js";
// import * as util  from 'node:util';
// import * as cmd from 'node:child_process'
// const exec = util.promisify(cmd.exec);
// const { stdout, stderr } = await exec('echo $USER');
// // where to store the networks
// let init:string = '/home/';
// let username:string = stdout;
// let location = init+username+'/.larch'
// location = location.replace(/(\r\n|\n|\r)/gm, "");

export const startNetwork = async (arg1:string,arg2:string,arg3:string,arg4:string) => {
    try {

        // let c1 = '[ -d "';
        // let c2 = location;
        // let c3 = '/zombienet/javascript/packages/cli/dist/" ] && echo "Directory exists"';
        // let command = c1+c2+c3;
        // command = command.replace(/(\r\n|\n|\r)/gm, "");
        // console.log(command)
        // const { stdout, stderr } = await exec(command);
        // console.log(stdout)
    

        // if(stdout === "Directory exists"){
        //     console.log("Sorry We can't");
        //     return;
            
        // }

        let str1 = arg1;
        let str2 = arg2;
        let str3 = arg3;
        let str4 = arg4;

        console.log("from zombienet-installer");
        // console.log(str1);
        // console.log(str2);
        // console.log(str3);
        // console.log(str4);

        console.log("Welcome to Zombienet binary")
        await createDirectory(str1,str2,str3,str4);
        // directoryIsExist(str1,str2)
        // cloneRepo (str1,str2);
        // directoryIsExist()
        
    } catch (error) {
        console.error(error);
    }
}

// startNetwork();
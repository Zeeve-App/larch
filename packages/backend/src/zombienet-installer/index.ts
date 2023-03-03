import { createDirectory } from "./createDirectory.js";
import * as util  from 'node:util';
import * as cmd from 'node:child_process'
import * as fs from 'fs'
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
// const fs = require('fs/promises');
const exec = util.promisify(cmd.exec);
const { stdout, stderr } = await exec('echo $USER');
// where to store the networks
let init:string = '/home/';
let username:string = stdout;
let location = init+username+'/.larch'
location = location.replace(/(\r\n|\n|\r)/gm, "");

export const startNetwork = async (arg1:string,arg2:string,arg3:string,arg4:string) => {
    try {

            console.log("from zombienet-installer");
                let str1 = arg1;
                let str2 = arg2;
                let str3 = arg3;
                let str4 = arg4;

            console.log("Welcome to Zombienet binary")

        // const dir = './uploads'
        let c1 = location
        let c2 = '/zombienet/javascript/packages/cli/dist'
        let dir = c1+c2;
        dir = dir.replace(/(\r\n|\n|\r)/gm, "");

        if (fs.existsSync(dir)) {
            console.log('Directory exists!')

            
                let locationNew:string = location+"/networks.json"
                locationNew = locationNew.replace(/(\r\n|\n|\r)/gm, "");


                const networkValue = {
                    name: str3,
                    dirName : str1,
                    fileName : str2,
                    confFile : str4
                }

                ////
                


                async function appendDataToFile(newData:any) {
                    try {
                    const existingData:any = await readFileAsync(locationNew);
                    const jsonData = JSON.parse(existingData);
                    jsonData.push(newData);
                    await writeFileAsync(locationNew, JSON.stringify(jsonData));
                    console.log('Data appended to file successfully');
                    } catch (err) {
                    console.error('Error appending data to file:', err);
                    }
                }
                await appendDataToFile(networkValue);
                ////
                
    

            //     let emptyArr = [] ;

            // emptyArr.push(networkValue)

            //  const myJSON = JSON.stringify(networkValue);

            // // emptyArr.push(myJSON)

            // fs.appendFile(locationNew, myJSON, function (err){
            //     if (err) throw err;
            //         console.log('Empty array created');
            // });


            // "That means the user have binary in his system under /home/${USER_NAME}/.larch/zombienet"

            // store the network.json in the /networks directory
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
            // and put it into networks directory

            // add the network info in the networks.json

            let c1 = 'cd && cd ';
        let c2 = location;
        let c3 = '/zombienet/javascript/packages/cli && node dist/cli.js -p podman spawn ';
        
        let c4 = location+"/networks/"+str2

        let c5 = ' -d ';
        let c6 = str1;
        let command = c1+c2+c3+c4+c5+c6
        command = command.replace(/(\r\n|\n|\r)/gm, "");
        console.log("This is command "+command)

        const { stdout, stderr } = await exec(command);
        console.log(stdout)
        console.log(stderr)

        ////////////////////////////////////////////////////////

                


          } else {
            console.log('Directory not found.')
            await createDirectory(str1,str2,str3,str4);
          }
        // let c1 = '[ -d "';
        // let c2 = location;
        // let c3 = '/zombienet/javascript/packages/cli/dis/" ] && echo "Directory exists"';
        // let command = c1+c2+c3;
        // command = command.replace(/(\r\n|\n|\r)/gm, "");
        // console.log(command)
        // const { stdout, stderr } = await exec(command);
        // console.log(stdout)
    

        // if(stdout == "Directory exists"){
        //     console.log("Sorry We can't");
        //     return;
            
        // }

        

        
        // console.log(str1);
        // console.log(str2);
        // console.log(str3);
        // console.log(str4);

        
        // await createDirectory(str1,str2,str3,str4);
        // directoryIsExist(str1,str2)
        // cloneRepo (str1,str2);
        // directoryIsExist()
        
    } catch (error) {
        console.error(error);
    }
}

// startNetwork();
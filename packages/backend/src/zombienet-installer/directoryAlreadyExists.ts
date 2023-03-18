import * as util  from 'node:util';
import * as cmd from 'node:child_process'
import * as fs from 'fs'
import { LOCATION, VERSION } from "../utils/declearation.js";
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const exec = util.promisify(cmd.exec);


export const directoryAlreadyExist = async (dirName:string,fileName:string,networkName:string,confFile:string) => {

    let locationNew:string = LOCATION+"/networks.json"
                locationNew = locationNew.replace(/(\r\n|\n|\r)/gm, "");

                const networkValue = {
                    name: networkName,
                    dirName : dirName,
                    fileName : fileName,
                    confFile : confFile
                }

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


        let new1 = LOCATION+'/networks/'
        let newLocation = new1+fileName;
        console.log(newLocation);
        newLocation = newLocation.replace(/(\r\n|\n|\r)/gm, "");

        const myBuffer = Buffer.from(confFile, 'base64');
        

        fs.appendFile(newLocation, myBuffer, function (err){
            if (err) throw err;
            console.log('Saved!');
        });
            // and put it into networks directory

            // add the network info in the networks.json
            

        let commandArr = [];
        commandArr.push(' cd ');
        commandArr.push(LOCATION);
        commandArr.push('/zombienet');
        commandArr.push('-');
        commandArr.push(VERSION);
        commandArr.push('/javascript/packages/cli && node dist/cli.js -p podman spawn ');
        commandArr.push(LOCATION);
        commandArr.push("/networks/");
        commandArr.push(fileName);
        commandArr.push(' -d ');
        commandArr.push(dirName);

        const command = commandArr.join("");
        console.log(command)
        const { stdout, stderr } = await exec(command);
        
        console.log(stdout)
        console.log(stderr)
}
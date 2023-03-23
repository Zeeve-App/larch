import * as util  from 'node:util';
import * as cmd from 'node:child_process'
import * as fs from 'node:fs/promises';
import * as fileHandeler from 'fs'
const readFileAsync = util.promisify(fileHandeler.readFile);
const writeFileAsync = util.promisify(fileHandeler.writeFile);
import { LOCATION, PROVIDER_NAME } from './declearation.js';

const exec = util.promisify(cmd.exec);
const spawn = util.promisify(cmd.spawn)

export const downloadZombienetBinary = async ( VERSION:string ):Promise<boolean> => {

            let downloadBinaryArr = [];
            downloadBinaryArr.push('curl -OL https://github.com/paritytech/zombienet/releases/download/v');
            downloadBinaryArr.push(VERSION);
            downloadBinaryArr.push('/zombienet-linux-x64')
            const downloadBinary = downloadBinaryArr.join("");

            let commandArr = [];
            commandArr.push('mkdir ');
            commandArr.push(LOCATION);
            commandArr.push(' && cd ')
            commandArr.push(LOCATION);
            commandArr.push(' && mkdir bin && ');
            commandArr.push('cd ');
            commandArr.push(LOCATION)
            commandArr.push('/bin && ');
            commandArr.push(downloadBinary)

            const command = commandArr.join("");

            const { stdout,stderr } = await exec(command);

            console.log("Initialize the Zombienet Binary");

            return true;


}

export const renameBinary = async ( VERSION:string ):Promise<boolean> => {

            let renameBinaryArr = [];
            renameBinaryArr.push('mv ')
            renameBinaryArr.push(LOCATION);
            renameBinaryArr.push('/bin/zombienet-linux-x64 ')
            renameBinaryArr.push(LOCATION);
            renameBinaryArr.push('/bin/zombienet-linux-x64-')
            renameBinaryArr.push(VERSION);

            const renameBinary = renameBinaryArr.join("");

            const { stdout,stderr } = await exec(renameBinary);

            console.log("Rename the Binary Name")

            return true
}

export const executePermissionToBinary = async ( VERSION:string ):Promise<boolean> => {

            let permissionBinaryArr = [];
            permissionBinaryArr.push('cd ');
            permissionBinaryArr.push(LOCATION)
            permissionBinaryArr.push('/bin ')
            permissionBinaryArr.push('&& chmod +x zombienet-linux-x64-')
            permissionBinaryArr.push(VERSION);

            const permissionBinary = permissionBinaryArr.join("")

            const { stdout, stderr } = await exec(permissionBinary);
    
            console.log("Execution permission given to the binary")

            return true

}

export const createNetworkDir = async ( VERSION:string ):Promise<boolean> => {

            let createNetworkDirectoryArr = [];
            createNetworkDirectoryArr.push('cd ');
            createNetworkDirectoryArr.push(LOCATION);
            createNetworkDirectoryArr.push(' && mkdir networks');

            const createNetworkDirectory = createNetworkDirectoryArr.join("")

            const { stdout, stderr } = await exec(createNetworkDirectory);
 
            console.log("Network Directory Created")

            return true

}

export const createDirectoryInsideNetworkDir = async (networkName:string):Promise<boolean> => {

    let createNetworkDirectoryArr = [];
    createNetworkDirectoryArr.push('cd ');
    createNetworkDirectoryArr.push(LOCATION);
    createNetworkDirectoryArr.push('/networks')
    createNetworkDirectoryArr.push(' && mkdir ')
    createNetworkDirectoryArr.push(networkName)

    const createNetworkDirectory = createNetworkDirectoryArr.join("")

    const { stdout, stderr } = await exec(createNetworkDirectory);

    console.log("Directory Created Inside nteworks");

    return true;

}



export const addIntoNetworksDirectory = async (fileName:string,confFile:string,networkName:string,VERSION:string):Promise<boolean> => {

        let locationArr = [];
        locationArr.push(LOCATION);
        locationArr.push('/networks/');
        locationArr.push(networkName)
        locationArr.push('/')
        locationArr.push(fileName)

        const location = locationArr.join("")


        const myBuffer = Buffer.from(confFile, 'base64');


        const appendFile = async (path:string, data:string|any) => {
            try {
              await fs.appendFile(path, data);
            } catch (error) {
              console.error(error); // error to handel
            }
          };
          await appendFile(location, myBuffer);     

        console.log("Network Added into the networks directory");

        return true

}

export const runZombienet = async (dirName:string,fileName:string,networkName:string,confFile:string,VERSION:string) => {

        let binaryLocationArr = [];
        binaryLocationArr.push('cd ');
        binaryLocationArr.push(LOCATION);
        binaryLocationArr.push('/bin && ./');
        binaryLocationArr.push('zombienet-linux-x64-')
        binaryLocationArr.push(VERSION);
        binaryLocationArr.push(' spawn ');
        binaryLocationArr.push(LOCATION)
        binaryLocationArr.push('/networks/');
        binaryLocationArr.push(networkName);
        binaryLocationArr.push('/');
        binaryLocationArr.push(fileName);
        binaryLocationArr.push(' -p ')
        binaryLocationArr.push(PROVIDER_NAME)
        binaryLocationArr.push(' -d ')
        binaryLocationArr.push(dirName);

        const binaryLocation = binaryLocationArr.join('');

        // console.log("The Final Command "+binaryLocation)

        const {stdout,stderr} = await exec(binaryLocation);
        console.log(stdout);
        console.log(stderr)

        console.log("Running Zombienet");
        if(stdout){

                let zombieNetworkRunOutputArr = [];
                zombieNetworkRunOutputArr.push(LOCATION);
                zombieNetworkRunOutputArr.push('/networks/')
                zombieNetworkRunOutputArr.push(networkName);
                zombieNetworkRunOutputArr.push('/');
                zombieNetworkRunOutputArr.push('output.txt');

                const zombieNetworkRunOutput = zombieNetworkRunOutputArr.join("")

                // const myBuffer = Buffer.from(stdout, 'base64');


                const appendFile = async (path:string, data:string|any) => {
                    try {
                      await fs.appendFile(path, data);
                    } catch (error) {
                      console.error(error); // error to handel
                    }
                  };

                  await appendFile(zombieNetworkRunOutput, stdout); 
        }
        if(stderr){

                let zombieNetworkRunOutputArr = [];
                zombieNetworkRunOutputArr.push(LOCATION);
                zombieNetworkRunOutputArr.push('/networks/')
                zombieNetworkRunOutputArr.push(networkName);
                zombieNetworkRunOutputArr.push('/');
                zombieNetworkRunOutputArr.push('outputErr.txt');

                const zombieNetworkRunOutput = zombieNetworkRunOutputArr.join("")

                // const myBuffer = Buffer.from(stdout, 'base64');


                const appendFile = async (path:string, data:string|any) => {
                    try {
                      await fs.appendFile(path, data);
                    } catch (error) {
                      console.error(error); // error to handel
                    }
                  };

                  await appendFile(zombieNetworkRunOutput, stderr); 
        }
        console.log("Running Zombienet");


}


export const manageNetworkJson = async (dirName:string,fileName:string,networkName:string,confFile:string,VERSION:string,dslFileName:string,dslFile:string):Promise<boolean> => {


  let locationArr = [];
  locationArr.push(LOCATION);
  locationArr.push('/networks.json');
  const location = locationArr.join("");

  // Adding Network Status

  let zombieJsonLocationArr = [];
  zombieJsonLocationArr.push(dirName)
  zombieJsonLocationArr.push('/zombie.json')

  const zombieJsonLocation = zombieJsonLocationArr.join("")

  // fileHandeler

  const jsonHandeler = () => {

    if (fileHandeler.existsSync(zombieJsonLocation)) {
    
      const networkStatus:string = "finished"
  
      return networkStatus
  
    }
      else if(fileHandeler.existsSync(dirName)){
        const networkStatus:string = "in-progress"
        return networkStatus
  }

  else {
    const networkStatus:string = "failed to create the network"

    return networkStatus
  }
}

const status = jsonHandeler();

if((!(dslFileName)) && (!(dslFile))){
  const networkValue = {
      name: networkName,
      dirName: dirName,
      fileName: fileName,
      confFile: confFile,
      dslFileName: "",
      dslFile: "",
      networkState: status,
      networkProvider:PROVIDER_NAME
  }
  let emptyArr = [];

  emptyArr.push(networkValue)

  const myJSON = JSON.stringify(emptyArr);

      const appendFile = async (path:string, data:string) => {
        try {
          await fs.appendFile(path, data);
        } catch (error) {
          console.error(error);
        }
      };
      await appendFile(location, myJSON);
  
      console.log("Creating Network Json and adding network into it");
}
else{
  const networkValue = {
    name: networkName,
    dirName: dirName,
    fileName: fileName,
    confFile: confFile,
    dslFileName: dslFileName,
    dslFile: dslFile,
    networkState: status,
    networkProvider:PROVIDER_NAME
  }
  let emptyArr = [];

  emptyArr.push(networkValue)

  const myJSON = JSON.stringify(emptyArr);

      const appendFile = async (path:string, data:string) => {
        try {
          await fs.appendFile(path, data);
        } catch (error) {
          console.error(error);
        }
      };
      await appendFile(location, myJSON);
  
      console.log("Creating Network Json and adding network into it");

}

      return true
      
}


// IF DIRECTORY ALREADY EXIST

export const zombieBinaryAlreadyExist = async (dirName:string,fileName:string,networkName:string,confFile:string,VERSION:string,dslFileName:string,dslFile:string) => {

    let createFileNameArr = [];
    createFileNameArr.push('cd ')
    createFileNameArr.push(LOCATION);
    createFileNameArr.push('/networks/');
    createFileNameArr.push(' && mkdir ');
    createFileNameArr.push(networkName)
    const createFileName = createFileNameArr.join("")

    const { } = await exec(createFileName);



let newLocationArr = [];
newLocationArr.push(LOCATION);
newLocationArr.push('/networks/');
newLocationArr.push(networkName);
newLocationArr.push('/')
newLocationArr.push(fileName)


let newLocation = newLocationArr.join("")

const myBuffer = Buffer.from(confFile, 'base64');


fileHandeler.appendFile(newLocation, myBuffer, function (err){
if (err) throw err;
console.log('Saved!');
});

let binaryLocationArr = [];
        binaryLocationArr.push('cd ');
        binaryLocationArr.push(LOCATION);
        binaryLocationArr.push('/bin && ./');
        binaryLocationArr.push('zombienet-linux-x64-')
        binaryLocationArr.push(VERSION);
        binaryLocationArr.push(' spawn ');
        binaryLocationArr.push(LOCATION)
        binaryLocationArr.push('/networks/');
        binaryLocationArr.push(networkName);
        binaryLocationArr.push('/');
        binaryLocationArr.push(fileName);
        binaryLocationArr.push(' -p ')
        binaryLocationArr.push(PROVIDER_NAME)
        binaryLocationArr.push(' -d ')
        binaryLocationArr.push(dirName);

        const binaryLocation = binaryLocationArr.join('');

        const {stdout,stderr} = await exec(binaryLocation);
        console.log(stdout);
        console.log(stderr)

        if(stdout){

          let zombieNetworkRunOutputArr = [];
          zombieNetworkRunOutputArr.push(LOCATION);
          zombieNetworkRunOutputArr.push('/networks/')
          zombieNetworkRunOutputArr.push(networkName);
          zombieNetworkRunOutputArr.push('/');
          zombieNetworkRunOutputArr.push('output.txt');

          const zombieNetworkRunOutput = zombieNetworkRunOutputArr.join("")

          // const myBuffer = Buffer.from(stdout, 'base64');


          const appendFile = async (path:string, data:string|any) => {
              try {
                await fs.appendFile(path, data);
              } catch (error) {
                console.error(error); // error to handel
              }
            };

            await appendFile(zombieNetworkRunOutput, stdout); 
  }

  if(stderr){

    let zombieNetworkRunOutputArr = [];
    zombieNetworkRunOutputArr.push(LOCATION);
    zombieNetworkRunOutputArr.push('/networks/')
    zombieNetworkRunOutputArr.push(networkName);
    zombieNetworkRunOutputArr.push('/');
    zombieNetworkRunOutputArr.push('outputErr.txt');

    const zombieNetworkRunOutput = zombieNetworkRunOutputArr.join("")

    // const myBuffer = Buffer.from(stdout, 'base64');


    const appendFile = async (path:string, data:string|any) => {
        try {
          await fs.appendFile(path, data);
        } catch (error) {
          console.error(error); // error to handel
        }
      };

      await appendFile(zombieNetworkRunOutput, stderr); 
}

        console.log("Running Zombienet");
        

        let locationNewArr = [];
    locationNewArr.push(LOCATION);
    locationNewArr.push("/networks.json")
    const locationNew = locationNewArr.join("")

    // Adding Network Status

  let zombieJsonLocationArr = [];
  zombieJsonLocationArr.push(dirName)
  zombieJsonLocationArr.push('/zombie.json')

  const zombieJsonLocation = zombieJsonLocationArr.join("")

  // fileHandeler

  const jsonHandeler = () => {

    if (fileHandeler.existsSync(zombieJsonLocation)) {
    
      const networkStatus:string = "finished"
  
      return networkStatus
  
    }
      else if(fileHandeler.existsSync(dirName)){
        const networkStatus:string = "in-progress"
        return networkStatus
  }

  else {
    const networkStatus:string = "failed to create the network"

    return networkStatus
  }
}

const status = jsonHandeler();

if((!(dslFileName)) && (!(dslFile))){

    const networkValue = {
        name: networkName,
        dirName : dirName,
        fileName : fileName,
        confFile : confFile,
        dslFileName : "",
        dslFile: "",
        networkState: status,
        networkProvider:PROVIDER_NAME
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
  }
  else{
    const networkValue = {
      name: networkName,
      dirName : dirName,
      fileName : fileName,
      confFile : confFile,
      dslFileName : dslFileName,
      dslFile: dslFile,
      networkState: status,
      networkProvider:PROVIDER_NAME
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
  }

}
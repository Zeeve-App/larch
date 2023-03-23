import * as util  from 'node:util';
import * as cmd from 'node:child_process'
import * as fs from 'node:fs/promises';
import * as fileHandeler from 'fs'
// import { spawn } from 'child_process';
const readFileAsync = util.promisify(fileHandeler.readFile);
const writeFileAsync = util.promisify(fileHandeler.writeFile);
import { LOCATION, PROVIDER_NAME } from './declearation.js';
import { exit } from 'node:process';

const exec = util.promisify(cmd.exec);
const spawn = util.promisify(cmd.spawn)


export const checkNetworkDirExists = async ( networkName:string,fileName:string ):Promise<boolean> => {

    let networkDirectoryArr = [];
    networkDirectoryArr.push('cd ');
    networkDirectoryArr.push(LOCATION);
    networkDirectoryArr.push('/networks/')
    networkDirectoryArr.push(networkName)
    networkDirectoryArr.push('/')
    networkDirectoryArr.push(fileName)

    const networkDirectory = networkDirectoryArr.join("")

    if (fileHandeler.existsSync(networkDirectory)) {
        return true
    }
    else{
         exit;
    }

    return true

}

export const matchFileName = async ( fileName:string,dslFileName:string ):Promise<boolean> => {

    const networkArr = fileName.split('.');
    const testArr = dslFileName.split('.');
    if(networkArr[0] === testArr[0]){
        return true
    }
    else{
        exit;
    }
    return true

}

export const createTestFile = async ( networkName:string,dslFileName:string,dslFile:string ):Promise<boolean> => {

    let locationArr = [];
        locationArr.push(LOCATION);
        locationArr.push('/networks/');
        locationArr.push(networkName)
        locationArr.push('/')
        locationArr.push(dslFileName)

        const location = locationArr.join("")


        const myBuffer = Buffer.from(dslFile, 'base64');


        const appendFile = async (path:string, data:string|any) => {
            try {
              await fs.appendFile(path, data);
            } catch (error) {
              console.error(error); // error to handel
            }
          };
          await appendFile(location, myBuffer);     

        console.log("Test File Created");

        return true
}

export const runTest = async ( dslFileName:string,VERSION:string,networkName:string ) => {

    let runZombieTestArr = [];
        runZombieTestArr.push('cd ');
        runZombieTestArr.push(LOCATION);
        runZombieTestArr.push('/bin && ./');
        runZombieTestArr.push('zombienet-linux-x64-')
        runZombieTestArr.push(VERSION);
        runZombieTestArr.push(' -p ')
        runZombieTestArr.push(PROVIDER_NAME)
        runZombieTestArr.push(' test ');
        runZombieTestArr.push(LOCATION)
        runZombieTestArr.push('/networks/');
        runZombieTestArr.push(networkName);
        runZombieTestArr.push('/');
        runZombieTestArr.push(dslFileName);
        

        const runZombieTest = runZombieTestArr.join('');
        // ./zombienet-linux -p native test examples/0000-test-toml-config-small-network.zndsl

        // console.log("The Final Command "+binaryLocation)

        const {stdout,stderr} = await exec(runZombieTest);

        
        

        console.log("Running Zombienet Test");
    

}



import * as fs from 'fs'
import { join } from 'path';
import * as util from 'node:util';
import * as cmd from 'node:child_process'
import { cloneRepo } from './cloneZombienet.js';
const exec = util.promisify(cmd.exec);

export const createNetworks = async (dirName:string,fileName:string,networkName:string,confFile:string) => {

    try {

        const { stdout, stderr } = await exec('echo -n $USER');

        let locationArr = [];
        locationArr.push('/home/');
        locationArr.push(stdout);
        locationArr.push('/.larch/networks.json');
        const location = join(...locationArr);
        console.log(location);


        const networkValue = {
            name: networkName,
            dirName: dirName,
            fileName: fileName,
            confFile: confFile
        }

        let emptyArr = [];

        emptyArr.push(networkValue)

        const myJSON = JSON.stringify(emptyArr);

        fs.appendFile(location, myJSON, function (err) {
            if (err) throw err;
            console.log('Empty array created');
        });

        await cloneRepo(dirName,fileName,networkName,confFile);
    } catch (error) {

    }

}
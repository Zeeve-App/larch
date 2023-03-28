import * as util from 'node:util';
import * as cmd from 'node:child_process'
import * as fs from 'node:fs/promises';
import { constants } from 'node:fs';
import * as fileHandeler from 'fs';
import { downloadFileToAPath } from './download.js';
import { PROVIDER_NAME, ZOMBIENET_BINARY_DOWNLOAD_BASE_URL, LARCH_CONTEXT_DIR } from './declaration.js';

const exec = util.promisify(cmd.exec);

export const downloadZombienetBinary = async (zombienetVersion: string): Promise<void> => {
  const binaryDownloadUrl = `${ZOMBIENET_BINARY_DOWNLOAD_BASE_URL}/v${zombienetVersion}/zombienet-linux-x64`;
  const binaryDirPath = `${LARCH_CONTEXT_DIR}/bin`;
  const binaryVersionedPath = `${binaryDirPath}/zombienet-linux-x64-${zombienetVersion}`;
  await fs.mkdir(binaryDirPath, { recursive: true });
  await downloadFileToAPath({
    downloadUrl: binaryDownloadUrl,
    filePath: binaryVersionedPath,
    progressRefreshInMs: 400,
    progressCb: (fileSize, currentFileSize) => {
      console.log(`Total file size: ${fileSize}, Current file size: ${currentFileSize}, Percent downloaded: ${((currentFileSize / fileSize) * 100).toFixed(2)}`);
    }
  });
};

export const executePermissionToBinary = async (zombienetVersion: string): Promise<void> => {
  const binaryDirPath = `${LARCH_CONTEXT_DIR}/bin`;
  const binaryVersionedPath = `${binaryDirPath}/zombienet-linux-x64-${zombienetVersion}`;
  await fs.chmod(binaryVersionedPath, constants.S_IRUSR | constants.S_IWUSR | constants.S_IXUSR);
};

export const createNetworksDir = async (): Promise<void> => {
  const networksDirPath = `${LARCH_CONTEXT_DIR}/networks`;
  await fs.mkdir(networksDirPath, { recursive: true });
};

export const createDirectoryInsideNetworkDir = async (networkName: string): Promise<void> => {
  const networksDirPath = `${LARCH_CONTEXT_DIR}/networks`;
  const networkDirPath = `${networksDirPath}/${networkName}`;
  await fs.mkdir(networkDirPath, { recursive: true });
};



export const addIntoNetworksDirectory = async (fileName: string, confFile: string, networkName: string, VERSION: string): Promise<void> => {
  const networksDirPath = `${LARCH_CONTEXT_DIR}/networks`;
  const networkDirPath = `${networksDirPath}/${networkName}`;
  const myBuffer = Buffer.from(confFile, 'base64');
  await fs.writeFile(`${networkDirPath}/${fileName}`, myBuffer);
};

export const runZombienet = async (dirName: string, fileName: string, networkName: string, confFile: string, VERSION: string) => {

  let binaryLocationArr = [];
  binaryLocationArr.push('cd ');
  binaryLocationArr.push(LARCH_CONTEXT_DIR);
  binaryLocationArr.push('/bin && ./');
  binaryLocationArr.push('zombienet-linux-x64-')
  binaryLocationArr.push(VERSION);
  binaryLocationArr.push(' spawn ');
  binaryLocationArr.push(LARCH_CONTEXT_DIR)
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

  const { stdout, stderr } = await exec(binaryLocation);
  console.log(stdout)
  console.log(stderr)

  console.log("Running Zombienet");

}


export const manageNetworkJson = async (dirName:string,fileName:string,networkName:string,confFile:string,VERSION:string,dslFileName:string,dslFile:string):Promise<boolean> => {


  let locationArr = [];
  locationArr.push(LARCH_CONTEXT_DIR);
  locationArr.push('/networks.json');
  const location = locationArr.join("");

  // Adding Network Status

  let zombieJsonLocationArr = [];
  zombieJsonLocationArr.push(dirName)
  zombieJsonLocationArr.push('/zombie.json')

  const zombieJsonLocation = zombieJsonLocationArr.join("")

  const jsonHandeler = () => {

    if (fileHandeler.existsSync(zombieJsonLocation)) {

      const networkStatus: string = "finished"

      return networkStatus

    }
    else if (fileHandeler.existsSync(dirName)) {
      const networkStatus: string = "in-progress"
      return networkStatus
    }

    else {
      const networkStatus: string = "failed to create the network"

      return networkStatus
    }
  }

  const status = jsonHandeler();

  const networkValue = {
    name: networkName,
    dirName: dirName,
    fileName: fileName,
    confFile: confFile,
    networkState: status,
    networkProvider: PROVIDER_NAME
  }

  let emptyArr = [];

  emptyArr.push(networkValue)

  const myJSON = JSON.stringify(emptyArr);

  const appendFile = async (path: string, data: string) => {
    try {
      await fs.appendFile(path, data);
    } catch (error) {
      console.error(error);
    }
  };
  await appendFile(location, myJSON);

  console.log("Creating Network Json and adding network into it");

  return true

}


// IF DIRECTORY ALREADY EXIST

export const zombieBinaryAlreadyExist = async (dirName: string, fileName: string, networkName: string, confFile: string, VERSION: string,dslFileName:string,dslFile:string) => {

  let createFileNameArr = [];
  createFileNameArr.push('cd ')
  createFileNameArr.push(LARCH_CONTEXT_DIR);
  createFileNameArr.push('/networks/');
  createFileNameArr.push(' && mkdir ');
  createFileNameArr.push(networkName)
  const createFileName = createFileNameArr.join("")

  const { } = await exec(createFileName);



  let newLocationArr = [];
  newLocationArr.push(LARCH_CONTEXT_DIR);
  newLocationArr.push('/networks/');
  newLocationArr.push(networkName);
  newLocationArr.push('/')
  newLocationArr.push(fileName)


  let newLocation = newLocationArr.join("")

  const myBuffer = Buffer.from(confFile, 'base64');


  fileHandeler.appendFile(newLocation, myBuffer, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  let binaryLocationArr = [];
  binaryLocationArr.push('cd ');
  binaryLocationArr.push(LARCH_CONTEXT_DIR);
  binaryLocationArr.push('/bin && ./');
  binaryLocationArr.push('zombienet-linux-x64-')
  binaryLocationArr.push(VERSION);
  binaryLocationArr.push(' spawn ');
  binaryLocationArr.push(LARCH_CONTEXT_DIR)
  binaryLocationArr.push('/networks/');
  binaryLocationArr.push(networkName);
  binaryLocationArr.push('/');
  binaryLocationArr.push(fileName);
  binaryLocationArr.push(' -p ')
  binaryLocationArr.push(PROVIDER_NAME)
  binaryLocationArr.push(' -d ')
  binaryLocationArr.push(dirName);

  const binaryLocation = binaryLocationArr.join('');

  const { stdout, stderr } = await exec(binaryLocation);

  console.log("Running Zombienet");

  console.log(stdout)
  console.log(stderr)

  let locationNewArr = [];
  locationNewArr.push(LARCH_CONTEXT_DIR);
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

      const networkStatus: string = "finished"

      return networkStatus

    }
    else if (fileHandeler.existsSync(dirName)) {
      const networkStatus: string = "in-progress"
      return networkStatus
    }

    else {
      const networkStatus: string = "failed to create the network"

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
    networkState: status,
    networkProvider: PROVIDER_NAME
  }
  let emptyArr = [];

  async function appendDataToFile(newData: any) {
    try {
      const existingData: any = await fs.readFile(locationNew);
      const jsonData = JSON.parse(existingData);
      jsonData.push(newData);
      await fs.writeFile(locationNew, JSON.stringify(jsonData));
      console.log('Data appended to file successfully');
    } catch (err) {
      console.error('Error appending data to file:', err);
    }
  }
  await appendDataToFile(networkValue);

}
}
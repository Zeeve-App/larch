import * as util from 'node:util';
import * as cmd from 'node:child_process';
import * as fs from 'node:fs/promises';
import * as fileHandeler from 'fs';
import { exit } from 'node:process';
import { LARCH_CONTEXT_DIR, LARCH_DEFAULT_PROVIDER_NAME } from '../config.js';

const exec = util.promisify(cmd.exec);

export const checkNetworkDirExists = (
  networkName: string,
  dslFileName: string,
): boolean | void => {
  const networkDirectoryArr = [];
  networkDirectoryArr.push(LARCH_CONTEXT_DIR);
  networkDirectoryArr.push('/networks/');
  networkDirectoryArr.push(networkName);
  networkDirectoryArr.push('/');
  networkDirectoryArr.push(dslFileName);

  const networkDirectory = networkDirectoryArr.join('');
  if (fileHandeler.existsSync(networkDirectory)) {
    return true;
  }
  console.log("Network Directory Doesn't exist");
  return exit();
};

export const matchFileName = async (fileName: string, dslFileName: string): Promise<boolean> => {
  const networkArr = fileName.split('.');
  const testArr = dslFileName.split('.');
  if (networkArr[0] === testArr[0]) {
    return true;
  }
  return exit();
};

export const runTest = async (
  dslFileName: string,
  VERSION: string,
  networkName: string,
): Promise<boolean> => {
  const runZombieTestArr = [];
  runZombieTestArr.push('cd ');
  runZombieTestArr.push(LARCH_CONTEXT_DIR);
  runZombieTestArr.push('/bin && ./');
  runZombieTestArr.push('zombienet-linux-x64-');
  runZombieTestArr.push(VERSION);
  runZombieTestArr.push(' -p ');
  runZombieTestArr.push(LARCH_DEFAULT_PROVIDER_NAME);
  runZombieTestArr.push(' test ');
  runZombieTestArr.push(LARCH_CONTEXT_DIR);
  runZombieTestArr.push('/networks/');
  runZombieTestArr.push(networkName);
  runZombieTestArr.push('/');
  runZombieTestArr.push(dslFileName);

  const runZombieTest = runZombieTestArr.join('');
  // ./zombienet-linux -p native test examples/0000-test-toml-config-small-network.zndsl

  // console.log("The Final Command "+binaryLocation)

  const { stdout, stderr } = await exec(runZombieTest);
  console.log(stdout);
  console.log(stderr);

  if (stdout) {
    const zombieNetworkRunTestOutputArr = [];
    zombieNetworkRunTestOutputArr.push(LARCH_CONTEXT_DIR);
    zombieNetworkRunTestOutputArr.push('/networks/');
    zombieNetworkRunTestOutputArr.push(networkName);
    zombieNetworkRunTestOutputArr.push('/');
    zombieNetworkRunTestOutputArr.push('testOutput.txt');

    const zombieNetworkRunTestOutput = zombieNetworkRunTestOutputArr.join('');

    // const myBuffer = Buffer.from(stdout, 'base64');

    const appendFile = async (path: string, data: string | any) => {
      try {
        await fs.appendFile(path, data);
      } catch (error) {
        console.error(error); // error to handel
      }
    };

    await appendFile(zombieNetworkRunTestOutput, stdout);
  }
  if (stderr) {
    const zombieNetworkRunTestOutputArr = [];
    zombieNetworkRunTestOutputArr.push(LARCH_CONTEXT_DIR);
    zombieNetworkRunTestOutputArr.push('/networks/');
    zombieNetworkRunTestOutputArr.push(networkName);
    zombieNetworkRunTestOutputArr.push('/');
    zombieNetworkRunTestOutputArr.push('testOutputErr.txt');

    const zombieNetworkRunTestOutput = zombieNetworkRunTestOutputArr.join('');

    const appendFile = async (path: string, data: string | any) => {
      try {
        await fs.appendFile(path, data);
      } catch (error) {
        console.error(error); // error to handel
      }
    };

    await appendFile(zombieNetworkRunTestOutput, stderr);
  }

  console.log('Running Zombienet Test');
  return true;
};

import * as util  from 'node:util';
import * as cmd from 'node:child_process'

const exec = util.promisify(cmd.exec);
const { stdout, stderr } = await exec('echo -n $USER');

// where to store the networks
let commandArr = [];
commandArr.push('/home/');
commandArr.push(stdout);
commandArr.push('/.larch');

const command = commandArr.join("")

export const LOCATION:string = command;


export const VERSION:string = '1.3.37';

export const LARCH_VERSION = process.env.npm_package_version;


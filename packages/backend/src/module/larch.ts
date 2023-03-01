#! /usr/bin/env node
import { Command } from "commander";
// const util = require('node:util');
// const exec = util.promisify(require('node:child_process').exec);
import * as util  from 'node:util';
import * as cmd from 'node:child_process'
const exec = util.promisify(cmd.exec);

import figlet from 'figlet'
// const figlet = require("figlet");

const program = new Command();

console.log(figlet.textSync("larch-cli"));

program
  .version("1.0.0")
  .description("An CLI for managing polkadot parachain configuration")
  .option('--disable-ui', "Disable Frontend")
  .option('--disable-api', "Disable Backend")
  .parse(process.argv);

const options = program.opts();

// async function disableUi () {
//   try {
    
//   } catch (error) {
    
//   }
// }

// async function disableApi () {
//   try {
    
//   } catch (error) {
    
//   }
// }
async function startBackend() {
  
  const { stdout, stderr } = await exec("npm run dev"); // for production change it to "npm start"
  
  // console.log(stdout)
}

// async function startFrontend() {
  
//   const { stdout, stderr } = await exec("npm run dev"); // for production change it to "npm start"
  
//   // console.log(stdout)
// }


if (options.disableUi && options.disableApi){
  console.log("You cannot disable UI and API at the same time")
}
else if (options.disableUi) {
  console.log("UI disabled");
  console.log("Starting Api Services")
  startBackend();
}

else if (options.disableApi) {
  console.log("API disabled")
  console.log("Starting UI Servieces")
  // startFrontend()
}
else if (!(options.disableUi && options.disableApi)){
    console.log("Starting both Backend and Frontend")
    // startBackend()
    // startFrontend()
}


// if (!process.argv.slice(2).length) {
//   program.outputHelp();
// }
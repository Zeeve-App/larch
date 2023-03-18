import { Command } from "commander";
import * as util  from 'node:util';
import * as cmd from 'node:child_process'
const exec = util.promisify(cmd.exec);

import figlet from 'figlet'

export const program = new Command();

console.log(figlet.textSync("larch-cli"));

program
  .version("1.0.0")
  .description("An CLI for managing polkadot parachain configuration")
  .option('--disable-ui', "Disable Frontend")
  .option('--disable-api', "Disable Backend")
  .parse(process.argv);

export const options = program.opts();

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

export const startBackend = async () => {

  const { stdout, stderr } = await exec("npm run dev"); // for production change it to "npm start"

}

// export const startFrontend = async () => {
  
//   const { stdout, stderr } = await exec("npm run dev"); // for production change it to "npm start"
  
//   // console.log(stdout)
// }





// if (!process.argv.slice(2).length) {
//   program.outputHelp();
// }
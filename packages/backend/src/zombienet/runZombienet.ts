// const util = require('node:util');
// import {util} from 'node:util';
// import {exec} from 'node:child_process';
import * as util  from 'node:util';
import * as cmd from 'node:child_process'
const exec = util.promisify(cmd.exec);
// const exec = util.promisify(require('node:child_process').exec);
// const exec = util.promisify(require('node:child_process').exec);
// import smallnet from '../zombienet/small-network.toml'
// networks/small-network.toml
export const zombienetRun = async (a:string,b:string|undefined) => {
    try {
        
        let str1 = a;
        let str2 = b;
        // console.log("from binary"+str1)
        // console.log("from binary1"+str2)
        console.log("Zombienet Start Running")
        let c1 = 'cd && cd parity-zeeve-zombienet/zombienet/javascript/packages/cli && node dist/cli.js -p podman spawn ';
        let c2 = str2;
        let c3 = ' -d ';
        let c4 = str1;
        let command = c1+c2+c3+c4
        command = command.replace(/(\r\n|\n|\r)/gm, "");
        // console.log("This is command"+command)
        // const str = 'cd && cd parity-zeeve-zombienet/zombienet/javascript/packages/cli && node dist/cli.js -p podman spawn ../../../examples/0001-small-network.toml'
        const { stdout, stderr } = await exec(command);
        console.log(stdout)
        console.log(stderr)
        console.log("Zombienet Running")
    } catch (error) {
        console.error(error);
    }
}
// podman pod rm -f collator01_pod bob_pod alice_pod temp-1_pod temp-collator_pod temp_pod grafana_pod tempo_pod prometheus_pod 
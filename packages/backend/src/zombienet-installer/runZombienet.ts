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
const { stdout, stderr } = await exec('echo $USER');
// where to store the networks
let init:string = '/home/';
let username:string = stdout;
let location = init+username+'/.larch'
location = location.replace(/(\r\n|\n|\r)/gm, "");


export const zombienetRun = async (arg1:string,arg2:string,arg3:string,arg4:string) => {
    try {
        
        let str1 = arg1;
        let str2 = arg2;
        let str3 = arg3;
        let str4 = arg4;

        // console.log("from run Zombienet");
        // console.log(str1);
        // console.log(str2);
        // console.log(str3);
        // console.log(str4);
        // console.log("From run Zombienet");
        // console.log("from binary"+str1)
        // console.log("from binary1"+str2)
        
        console.log("Zombienet Start Running")
        let c1 = 'cd && cd ';
        let c2 = location;
        let c3 = '/zombienet/javascript/packages/cli && node dist/cli.js -p podman spawn ';
        
        let c4 = location+"/networks/"+str2

        let c5 = ' -d ';
        let c6 = str1;
        let command = c1+c2+c3+c4+c5+c6
        command = command.replace(/(\r\n|\n|\r)/gm, "");
        console.log("This is command "+command)
        // const str = 'cd && cd /home/antar/.larch/zombienet/javascript/packages/cli && node dist/cli.js -p podman spawn ../../../examples/0001-small-network.toml'
        
        const { stdout, stderr } = await exec(command);
        console.log(stdout)
        console.log(stderr)

        console.log("Zombienet Running")
    } catch (error) {
        console.error(error);
    }
}

// podman pod rm -f collator01_pod bob_pod alice_pod temp-1_pod temp-collator_pod temp_pod grafana_pod tempo_pod prometheus_pod 
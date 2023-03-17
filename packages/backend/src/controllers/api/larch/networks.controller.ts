import { Request,Response } from "express"
import { initializeService } from "../../../zombienet-installer/index.js";
import * as util  from 'node:util';
import * as cmd from 'node:child_process'
import * as fs from 'fs'
import { LOCATION } from "../../../utils/declearation.js";
import { startZombienet } from "../../../utils/index.js";
const exec = util.promisify(cmd.exec);

export const networkController = async (req:Request,res:Response) => {
    try {

            let networkLocationArr = [];
            networkLocationArr.push(LOCATION)
            networkLocationArr.push('/networks.json')

            const networkLocation = networkLocationArr.join("")

            if(!(fs.existsSync(networkLocation))){
                return res.status(200).send({message:"No Networks Available"});
            }
            else{
                fs.readFile( networkLocation, 'utf8',  (err, data) => {
            
                    if(err){
                        console.log(err) // Error to handel
                    }
                    return res.status(200).send(JSON.parse(data));
                    
                 });
            }
        

    } catch (error) {
        return res.status(500).json("Server Error");
    }
}
 
export const createNetworkController = async (req:Request,res:Response) => {
    try {
        const {dirName,fileName,networkName,confFile} = req.body;
        // console.log(dirName); // -d parameter
        // console.log(fileName); // where the network config will be written
        // console.log(NetworkName); // a random network name given by the user
        // console.log(confFile); // -p podman spawn parameter
        

        if(!(req.body.dirName) && !(req.body.fileName) && !(req.body.networkName) && !(req.body.confFile)){
            return res.status(404).json({msg:"Empty values are not allowed"});
        }

        else if(!(req.body.dirName)){
            return res.status(404).json({msg:"Directory Name Required"});
        }
        else if(!(req.body.fileName)){
            return res.status(404).json({msg:"File Name Required"});
        }
        else if(!(req.body.networkName)){
            return res.status(404).json({msg:"Network Name Required"});
        }
        else if(!(req.body.confFile)){
            return res.status(404).json({msg:"Configuration File Required"});
        }

        else{

            await startZombienet(req.body.dirName,req.body.fileName,req.body.networkName,req.body.confFile)

            

            return res.status(200).json({message:"Uploaded successfully",directoryName:dirName,fileName:fileName,networkName:networkName,networkConfiguration:confFile});
       
        
    }
        

    } catch (error) {
        console.log(error)
        return res.status(500).json("Server Error")
    }
}


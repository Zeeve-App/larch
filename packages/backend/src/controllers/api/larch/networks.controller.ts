import { Request,Response } from "express"
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
        

        if(!(dirName) && !(fileName) && !(networkName) && !(confFile)){
            return res.status(404).json({msg:"Empty values are not allowed"});
        }

        else if(!(dirName)){
            return res.status(404).json({msg:"Directory Name Required"});
        }
        else if(!(fileName)){
            return res.status(404).json({msg:"File Name Required"});
        }
        else if(!(networkName)){
            return res.status(404).json({msg:"Network Name Required"});
        }
        else if(!(confFile)){
            return res.status(404).json({msg:"Configuration File Required"});
        }

        else{

                const updatedNetworkName = networkName.replace(/\s/g,"");

                if(fs.existsSync(dirName)){
                    return res.status(400).json({message:"This directory already exists at this location, please change the location or directory name"})
                }

                const networkArr = fileName.split('.');
                if(networkArr.length>=2 && (networkArr[1] === 'json')|| (networkArr[1] === 'toml') || (networkArr[1] === 'zndsl')){

                    var updatedFilename = fileName.replace(/\s/g,"-");
                }
                else{
                    return res.status(400).json({message:"Please give a valid file name and finish with .json or .toml or .zndsl extension"})
                }

                await startZombienet(req.body.dirName,updatedFilename,updatedNetworkName,req.body.confFile)

                return res.status(200).json({message:"Network Running successfully",directoryName:dirName,fileName:updatedFilename,networkName:updatedNetworkName,networkConfiguration:confFile}); 
    }
        

    } catch (error) {
        console.log(error)
        return res.status(500).json("Server Error")
    }
}


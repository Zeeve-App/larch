import { Request,Response } from "express"
import * as fs from 'fs'
import { LOCATION } from "../../../utils/declearation.js";


export const progressController = async (req:Request,res:Response) => {
    try {

        let networkLocationArr = [];
        networkLocationArr.push(LOCATION)
        networkLocationArr.push('/networks.json')

        const networkLocation = networkLocationArr.join("")
    fs.readFile( networkLocation, 'utf8',  (err, data) => {
        
        if(err){
            console.log(err) // Error to handel
        }
        let networkJson = JSON.parse(data)
        let arrLength = networkJson.length
        // console.log(arrLength);
        if(arrLength<=0)
        {
            return res.status(200).json({"message":"No Network to show the progress"})
        }
        else if(arrLength>0){
            for(let i=0; i<arrLength;i++){
                
                // console.log(networkJson[i].dirName) 

                let returnNetworkObj ={
                    networkName:networkJson[i].networkName,
                    networkState:networkJson[i].networkState
                }

                return res.status(200).send(JSON.stringify(returnNetworkObj))
                // return res.status(200).json({"networkName":networkJson[i].networkName,"networkState":networkJson[i].networkState})

                
                                        
                    
            }
        }
        // return res.status(200).send(networkJson[1])
        // return res.status(200).send(JSON.parse(data));
        
     });
    
//       let zombieJsonLocationArr = [];
//   zombieJsonLocationArr.push(dirName)
//   zombieJsonLocationArr.push('/zombie.json')

//   const zombieJsonLocation = zombieJsonLocationArr.join("")

//   // fileHandeler

//   const jsonHandeler = async () => {
//   if(fs.existsSync(dirName)){
//     const networkStatus:string = "in-progress"
//     return networkStatus
//   }

//   else if (fs.existsSync(zombieJsonLocation)) {
    
//     const networkStatus:string = "finished"

//     return networkStatus

//   }
// }



        // return res.status(500).json({"message":"OK STATUS"});
    } catch (error) {
        return res.status(500).json("Server Error");
    }
}
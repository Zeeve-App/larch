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
                return res.status(404).json({"message":"No Network to show the progress"}) // Error to handel
            }
            let networkJson = JSON.parse(data)
            let arrLength = networkJson.length
            const emptyArr:any =[];

                if(arrLength<=0)
                {
                    return res.status(404).json({"message":"No Network to show the progress"})
                }
                else if(arrLength>0){


                    for(let i=0; i<arrLength;i++){
                        let returnNetworkObj ={
                            networkName:networkJson[i].name,
                            networkState:networkJson[i].networkState
                        }
                        emptyArr.push(returnNetworkObj)

                    }
        
                }
            const jsonfile = JSON.stringify(emptyArr);
        
            return res.status(200).send(JSON.parse(jsonfile))

        });

    } catch (error) {

        return res.status(500).json("Server Error");

    }

}
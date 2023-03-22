import { Request,Response } from "express"
import * as fs from 'fs'
import { LOCATION } from "../../../utils/declearation.js";


export const progressController = async (req:Request,res:Response) => {
    try {

        const searchNetwork = req.query.networkName
        let networkLocationArr = [];
        networkLocationArr.push(LOCATION)
        networkLocationArr.push('/networks.json')

        const networkLocation = networkLocationArr.join("")

        fs.readFile( networkLocation, 'utf8',  (err, data) => {
        
            if(err){
                return res.status(404).json({"message":"No Network to show the progress"}) 
            }
            let networkJson = JSON.parse(data)
            let arrLength:number = networkJson.length;

                if(arrLength<=0)
                {
                    return res.status(404).json({"message":"No Network to show the progress"})
                }
                
                    for(let i=0; i<arrLength;i++){
                        if(networkJson[i].name == searchNetwork){
                            return res.status(200).json({"networkState":networkJson[i].networkState});
                        }

                    }
        
            return res.status(404).json({"message":"No Network to show the progress"})

        });

    } catch (error) {

        return res.status(500).json("Server Error");

    }

}
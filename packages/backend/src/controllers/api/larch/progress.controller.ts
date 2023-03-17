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

                let zombieJsonLocationArr = [];
                zombieJsonLocationArr.push(networkJson[i].dirName)
                zombieJsonLocationArr.push('/zombie.json')
                const zombieJsonLocation = zombieJsonLocationArr.join("")

                
                      
                    
                    //    if (fs.existsSync(zombieJsonLocation)) {
                        
                    //     const networkStatus:string = "finished"

                    //     let newObj ={
                    //         networkState:  networkStatus
                    //     } 
                    //     //add networkStatus in the json file
                    //     // console.log()
                    //     fs.writeFile(JSON.stringify(networkJson[i]),JSON.stringify(newObj),(err)=>{
                    //         if (err)
                    //             console.log(err);
                    //         else {
                    //             console.log(JSON.stringify(networkJson[i]));
                                
                    //         }
                    //     });
                    //     // let networkState =  networkStatus
                    
                    //     // return res.status(200).send(networkStatus)
                    //   }
                       if(fs.existsSync(networkJson[i].dirName)){
                        // const networkStatus:string = "in-progress"
                        let newObj ={
                            networkState:  "in-progress"
                        } 
                        // console.log(newObj)
                        // const networkJsonFile = JSON.parse(networkJson[i])
                        // const jsonStr = JSON.stringify(networkJsonFile);
                        // console.log(jsonStr)

                        const data = fs.readFileSync(networkLocation,'utf-8');
                        const jsonData = JSON.parse(data);

                        jsonData.networkState = "in-progress"

                        const newData = jsonData[i];
                        const updatedData = JSON.stringify(newData)
                        console.log(updatedData)
                        // console.log(jsonData)
                        // fs.writeFileSync
                        // console.log(jsonStr)
                        // fs.appendFile(JSON.stringify(networkJson[i]),JSON.stringify(newObj),(err)=>{
                        //     if (err)
                        //         console.log(err);
                        //     else {
                        //         console.log(JSON.stringify(networkJson[i]));
                                
                        //     }
                        // });
                        
                        // console.log(JSON.stringify(networkJson[i]))
                        // let networkState =  networkStatus
                        // return res.status(200).send(networkStatus)
                        
                      }
                    
                    
                    
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
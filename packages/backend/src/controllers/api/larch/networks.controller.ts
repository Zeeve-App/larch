import { Request,Response } from "express"
import { startNetwork } from "../../../zombienet/index.js";
import { zombienetRun } from "../../../zombienet/runZombienet.js";
export const networkController = async (req:Request,res:Response):Promise<Response> => {
    try {
        return res.status(200).json({message:"success from network api"});
    } catch (error) {
        return res.status(500).json("Server Error");
    }
}

// export const createNetworkController = async(req:Request,res:Response):Promise<Response> => {
//     try {
//         return res.status(200).json({message:"success from createnetwork api"});
//     } catch (error) {
//         return res.status(500).json("Server Error");
//     }
// }

export const createNetworkController = async (req:Request,res:Response) => {
    try {
        
        console.log(req.body.directoryName);
        console.log(req.file?.path);
        const str1:string = req.body.directoryName
        const str2:string|undefined = req.file?.path
        // zombienetRun(req.body.directoryName,str)
        // console.log(req.file);
        await startNetwork(str1,str2);
        return res.status(200).json({message:"Uploaded successfully"});
        // const {confFile,dirName} = req.body;
        
        // const request = req.body;
        // console.log(request[0]);
        // for(let i=0;i< request.length; i++){
        //     let configFile = request[i].confFile;
        //     let directoryName = request[i].dirName;
        //     console.log(configFile);
        //     // return res.status(200).json({message:"user created successfully", body:{user:{configFile,directoryName}}});
        // }
        // console.log(confFile)
        // console.log(dirName)
        // const addUser:QueryResult = await pool.query("INSERT INTO tbl_user (user_name,user_email_id) VALUES ($1,$2)",[userName,userEmail])
    // return res.status(200).json({message:"user created successfully", body:{user:{confFile,dirName}}});

    } catch (error) {
        return res.status(500).json("Server Error")
    }
}

// for(var i=0; i<req.body.length; i++) {
//     var month = req.body[i].month;
//     var year = req.body[i].year;
//     var monthYear = month + year;
// key = monthYear + "_new";
// console.log("Key is ", key);
// var request = {
// //targets: let default to the peer assigned to the client
// chaincodeId: 'abc',
// fcn: 'getTransactionsByKey',
// args: [key]

// //Calling chaincode smartcontract
// return channel.queryByChaincode(request);
// }
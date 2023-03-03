import { Request,Response } from "express"

export const healthController = async (req:Request,res:Response):Promise<Response> => {
    try {
        return res.status(200).json({message:"success from health api"})
    } catch (error) {
        return res.status(500).json("Server Error")
    }
}

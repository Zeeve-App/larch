import { Request,Response } from "express"
import { VERSION,LARCH_VERSION } from "../../../utils/declearation.js";

export const versionController = async (req:Request,res:Response)=> {
    try {
        return res.status(200).json({"zombienet-version":VERSION,"larch-version":LARCH_VERSION})
    } catch (error) {
        return res.status(500).json("Server Error");
    }
}
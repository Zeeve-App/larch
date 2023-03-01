import { Request } from "express";
import { FileFilterCallback } from "multer";

export const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
): void => {
    if(file.mimetype === "application/json"){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}
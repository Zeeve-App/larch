import express from 'express'
import {Request, Response, NextFunction, Application, ErrorRequestHandler} from 'express'
import {Server} from 'http'
import createHttpError from 'http-errors';
import {config} from 'dotenv';
import allRoute from './routes/index.js'
import cors from 'cors';

// const router = express.Router();

config()

const app:Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(allRoute);

//only enable this for testing with jest for checking the jest configuration 

// app.get("/",(req:Request,res:Response,next:NextFunction) => {
//     res.status(201).json({message:"Welcome to larch-cli apis"});
// })

app.use((req:Request,res:Response,next:NextFunction) => {
    next(new createHttpError.NotFound());
})

const errorHandler: ErrorRequestHandler = (err,req,res,next) => {
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message,
    })
}

app.use(errorHandler)

const PORT: Number = Number(process.env.PORT) || 8765 ;

const server:Server = app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})

export default app;
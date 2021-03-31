import express,{Request,Response,NextFunction} from "express";
import cors from "cors";
import 'dotenv/config'


import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import {connectDb} from "./helpers/database"
import HttpException from "./utils/HttpException";

const app = express();

/* Midddlewares */
app.use(cors())
app.use(express.json());

/* Cors free requests */
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','*');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
});

/* Routes */
app.use('/auth',authRouter);
app.use('/user',userRouter);


/* Error handler middleware */
app.use((error:HttpException,req:Request,res:Response,next:NextFunction)=>{
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message:message,errors:data});
  }); 
  


connectDb(()=>{
    console.log('Database connection successfull!');
    app.listen(3030,()=>{
        console.log('listening...')
    });
})


/* Controllers/Middleware functions of auth apis */

import {Request,Response,NextFunction} from "express";
import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs";
import crypto from 'crypto';
import HttpException from "../utils/HttpException";
import { generateAccessToken } from "../helpers/jwt_helper";

import User from "../models/user";


/* Login user */
export const postLogin = async (req:Request,res:Response,next:NextFunction)=>{
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req).array();

    try{
        /* Check if user is existed or not */
        const user = await User.findByEmail(email);
        if (!user) {
          const error = new HttpException("Incorrect Email");
          error.statusCode = 404;
          error.data =  errors;
          throw error;
        }

        /* Compare passwords are equal or not */
        const isPasswordsEqual = await bcryptjs.compare(password,user.password);
        if(!isPasswordsEqual){
            const error = new HttpException('Incorrect Password');
            error.statusCode = 401;
            error.data = errors;
            throw error;    
        }
        
        /* Create accesstoken from payload */
        const payload = {userId:user._id};
        const accessToken = await generateAccessToken(payload);


        res.status(200).json({message:'login successfull.',data:{accessToken:accessToken,userId:user._id}});
    }catch(err){
         /* If no error code avaiable then assign 500 */
        if(!err.statusCode){
            err.statusCode = 500;
        }
        //Pass to custom error handler
        next(err);
    }

}


/* Register user */
export const postSignup = async (req:Request,res:Response,next:NextFunction)=>{

    
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    //Get errors from validator
    const errors = validationResult(req).array();


    try{
        /* Erros from express-validator */
        if(errors.length > 0){
            const error = new HttpException("Invalid data");
            error.message = errors[0].msg;
            error.statusCode = 422;
            error.data = errors;
            throw error;    
        }

        /* Hash password */
        const hashedPass = await bcryptjs.hash(password,12);
        const newUser = new User(email,hashedPass,Date.now(),name);

        /* Save user to db */
        await newUser.save();
        res.status(201).json({messge:'user created successfully'});
    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }

}





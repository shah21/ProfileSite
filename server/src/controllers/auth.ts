import {Request,Response,NextFunction} from "express";
import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs";
import crypto from 'crypto';
import HttpException from "../utils/HttpException";
import { generateAccessToken } from "../helpers/jwt_helper";

import User from "../models/user";


export const postLogin = async (req:Request,res:Response,next:NextFunction)=>{
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req).array();

    try{
        const user = await User.findByEmail(email);
        if (!user) {
          const error = new HttpException("Incorrect Email");
          error.statusCode = 404;
          error.data =  errors;
          throw error;
        }

        const isPasswordsEqual = await bcryptjs.compare(password,user.password);
        if(!isPasswordsEqual){
            const error = new HttpException('Incorrect Password');
            error.statusCode = 401;
            error.data = errors;
            throw error;    
        }
        
        const payload = {userId:user._id};
        const accessToken = await generateAccessToken(payload);


        res.status(200).json({message:'login successfull.',data:{accessToken:accessToken,userId:user._id}});
    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }

}

export const postSignup = async (req:Request,res:Response,next:NextFunction)=>{

    
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const errors = validationResult(req).array();


    try{

        if(errors.length > 0){
            const error = new HttpException("Invalid data");
            error.message = errors[0].msg;
            error.statusCode = 422;
            error.data = errors;
            throw error;    
        }

        
        const hashedPass = await bcryptjs.hash(password,12);
        const newUser = new User(email,hashedPass,Date.now(),name);
        await newUser.save();
        res.status(201).json({messge:'user created successfully'});
    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }

}





import {Request,Response,NextFunction} from "express";
import { validationResult } from "express-validator";
import HttpException from "../utils/HttpException";

import User from "../models/user";


export const getUser = async (req:Request,res:Response,next:NextFunction)=>{
    const userId:string = req.userId!;
    try{
        const user = await User.findById(userId);
        if (!user) {
          const error = new HttpException("User not found");
          error.statusCode = 404;
          throw error;
        }

        const userObj = {
            _id:user._id,
            email:user.email,
            signedAt:user.signedAt,
            age: user.age,
            gender: user.gender,
            name: user.name
        }

        res.status(200).json({messge:'success',user:userObj});
    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};



export const updateProfile = async (req:Request,res:Response,next:NextFunction)=>{
    const userId:string = req.userId!;
    const name:string = req.body.name;
    const age:string = req.body.age;
    const gender:string = req.body.gender;

    const errors = validationResult(req).array();
        
    try{
    
        if(errors.length > 0){
            const error = new HttpException("Invalid data");
            error.message = errors[0].msg;
            error.statusCode = 422;
            error.data = errors;
            throw error;    
        }

    
        const user = await User.findById(userId);
        if (!user) {
          const error = new HttpException("User not found");
          error.statusCode = 401;
          throw error;
        }

        const values:{age?:number,name?:string,gender?:string}={};

    
        if(typeof(name) !== 'undefined'){
            values.name = name;
        }
        if(typeof(age) !== 'undefined'){
            values['age'] = Number.parseInt(age);
        }
        if(typeof(gender) !== 'undefined' && gender.length > 0){
            values.gender = gender;
        }

       


        const updatedValue = await (await User.updateById(userId,values)).value ;
        res.status(200).json({messge:'updated successfully!',user:updatedValue});
    }catch(err){
        console.log(err);
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};










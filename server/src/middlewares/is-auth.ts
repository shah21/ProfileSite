import { Request,Response,NextFunction } from "express";
import HttpException from '../utils/HttpException';
import { verifyAccessToken } from '../helpers/jwt_helper';


interface MyToken {
    userId: string;
    email: string;
}

export default async (req:any,res:Response,next:NextFunction) => {
    
    let decodedToken:MyToken;
    try{
        const headers = req.get('Authorization');
        if(!headers){
            console.log('No header');
            const error = new HttpException('Not authenticated')
            error.statusCode = 401;
            throw error;
        }
        const token = headers.split(' ')[1];
        
        decodedToken = await verifyAccessToken(token) as MyToken;
        req.userId = decodedToken.userId;
        next();

    }catch(err){
        err.message = "Token is not valid"
        err.statusCode = 401;
        next(err);
    }

    
}
   
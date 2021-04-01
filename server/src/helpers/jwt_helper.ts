/* Helper fundtion for create abnd verify jwt token */

import jwt from "jsonwebtoken";


/* Generate new token */
export const generateAccessToken = (payload:object) =>{
    return new Promise((resolve,reject)=>{
        /* Sign new token */
        jwt.sign(payload,process.env.JWT_SECRET_KEY!,{expiresIn:'1hr'},(err,token)=>{
            if(err){
                reject(err.message);
            }
            resolve(token);
        });
    })
}


/* Verify accessToken with secret key */
export const verifyAccessToken = (token:string) =>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,process.env.JWT_SECRET_KEY!,(err,payload)=>{
            if(err){
                /* If token is malfunctioned or expired */
                err.message = "Not authorized";
                reject(err);
            }
            resolve(payload);
        });
    })
}
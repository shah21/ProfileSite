import jwt from "jsonwebtoken";


export const generateAccessToken = (payload:object) =>{
    return new Promise((resolve,reject)=>{
        jwt.sign(payload,process.env.JWT_SECRET_KEY!,{expiresIn:'1hr'},(err,token)=>{
            if(err){
                reject(err.message);
            }
            resolve(token);
        });
    })
}



export const verifyAccessToken = (token:string) =>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,process.env.JWT_SECRET_KEY!,(err,payload)=>{
            if(err){
                err.message = "Not authorized";
                reject(err);
            }
            resolve(payload);
        });
    })
}
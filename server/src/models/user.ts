import { getDb } from "../helpers/database";
import {ObjectId } from'mongodb';


export default class User{
    email:string;
    password:string;
    signedAt:number;
    name:string;
    age:number = undefined!;
    gender:string = undefined!;

    constructor(email:string,password:string,signedAt:number,name:string,age ?:number,gender?:string){
        this.email = email;
        this.password = password;
        this.signedAt = signedAt;
        this.name = name;
        this.age = age!;
        this.gender = gender!;
    } 

    save(){
        return getDb().collection('users').insertOne(this);
    }

    static findByEmail(email:string){
        return getDb().collection('users').findOne({email:email});
    }


    static findById(id:string){
        return getDb().collection('users').findOne({_id:new ObjectId(id)});
    }

    static updateById(id:string,values:object){
        return getDb().collection('users').findOneAndUpdate({_id:new ObjectId(id)},{$set:values},{returnOriginal:false});
    }
    
}
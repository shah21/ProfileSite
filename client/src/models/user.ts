
export default class User{
    email:string;
    signedAt:number;
    name:string;
    age:number = undefined!;
    gender:string = undefined!;

    constructor(email:string,signedAt:number,name:string,age ?:number,gender?:string){
        this.email = email;
        this.signedAt = signedAt;
        this.name = name;
        this.age = age!;
        this.gender = gender!;
    } 


    
}
import {useState} from "react";
import Cookie from "js-cookie";


interface FuncType {
    token:string;
    setToken:(accessToken:string)=>void;
}


//custom hook 
export function useToken():FuncType{


    const getToken = ()=>{
        return Cookie.get('accessToken');
    };

    const [token,setToken] = useState<string>(getToken() as string);


    const saveToken = (accessToken:string)=>{

        if(accessToken){
            Cookie.set('accessToken',accessToken,{
                expires: new Date(new Date().getTime() + 1 * 3600 * 1000)
            });

            setToken(accessToken);
        }
    };

    return{
        setToken:saveToken,
        token:token
    }

}
/* Custom hook for token */


import {useState} from "react";
import Cookie from "js-cookie";

/* Return type of function */
interface FuncType {
    token:string;
    setToken:(accessToken:string)=>void;
}


export function useToken():FuncType{

    /* Get token from cookies */
    const getToken = ()=>{
        return Cookie.get('accessToken');
    };

    /* State */
    const [token,setToken] = useState<string>(getToken() as string);

    /* Save token to cookie */
    const saveToken = (accessToken:string)=>{

        if(accessToken){
            Cookie.set('accessToken',accessToken,{
                expires: new Date(new Date().getTime() + 1 * 3600 * 1000)
            });

            setToken(accessToken);
        }
    };

    /* Return state,setState */
    return{
        setToken:saveToken,
        token:token
    }

}
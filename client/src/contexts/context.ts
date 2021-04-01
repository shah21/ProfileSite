import React from "react";

const tokenContextInit = {
    token:null! as string,
    setToken:null as any,
}

export const TokenContext = React.createContext(tokenContextInit);


const flashInit = {
    flash:{
    message:undefined! as string,
    type:undefined! as string,
    },
    setFlash:null as any,
};
export const FlashContext = React.createContext(flashInit);
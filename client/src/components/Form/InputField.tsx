import { makeStyles, TextField } from '@material-ui/core';
import React from 'react'


type TypeProps = {
    handleChange:(e:InputType)=>void;
    label:string,
    error:string,
    type:string,
    name:string
}

function InputField({handleChange,label,error,type,name}:TypeProps) {
    
    const classes = useStyle(); 

    return (
        <div className={classes.container}>
            <TextField 
                size="small"
                onChange={(e)=>handleChange(e)}
                className={classes.inputField} 
                label={label} 
                type={type} 
                name={name}
                error={error ? true : false} 
                variant="outlined" />

            {error && (<p className={classes.errorText}>*{error}</p>) }
        </div>
        
    )
}


const useStyle = makeStyles({
    container:{
        margin:'10px 0',
    },

    inputField:{
        width:'50%',
    },
    errorText:{
        color:'red',
        fontSize:12,
        paddingTop:5,
    }
});


export default InputField;

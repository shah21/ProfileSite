import { makeStyles } from "@material-ui/core";





export const useStyle = makeStyles({
    loginPage:{
        width:'50%',
        margin:'100px auto',
    },
    form:{
        marginTop:30,
        display:'flex',
        flexDirection:'column',
    },
    buttonLogin:{
        marginTop:'50px',
        width:'50%',
    },
    buttonSignup:{
        marginTop:'20px',
        width:'50%',
    },
    errorText:{
        color:'red',
        fontSize:16,
        fontWeight:'bold',
    },
    
});
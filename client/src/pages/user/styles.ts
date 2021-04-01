import { makeStyles } from "@material-ui/core";





export const useStyle = makeStyles({
    homePage:{
        width:'50%',
        margin:'100px auto',
    },
    container:{
        marginTop:30,
        display:'flex',
        flexDirection:'column',
        padding:10,
    },
    btnLogout:{
        marginTop:'50px',
    },
    label:{
        fontWeight:'bold',
    }
});
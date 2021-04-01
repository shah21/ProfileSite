import { Typography, Button } from '@material-ui/core';
import React from 'react'
import { Redirect, useHistory } from 'react-router-dom';

import axios from "../../axios/config";
import endpoints from '../../axios/endpoints';
import InputField from '../../components/Form/InputField';
import { FlashContext, TokenContext } from '../../contexts/context';
import { useStyle } from "./styles";


const loginUser = async (credentails:object) =>{

    try {
      const response = await axios.post(endpoints.login, JSON.stringify(credentails), {
        headers: {
          "Content-Type": "application/json"
        },
      });
      return response.data;
    } catch (err) {
      throw err
    }
}

const formReducer = (state:object, event: any) => {
    return {
      ...state,
      ...event
    }
}

function Login() {

    const [formData, setFormData] = React.useReducer(formReducer, {});
    const [errors, setErrors] = React.useState({
        email:null! as string,
        password:null! as string 
      });  
      
    
    const history = useHistory();  
    const {token,setToken} = React.useContext(TokenContext);
    const {setFlash} = React.useContext(FlashContext);

    /* Handle user input */
    const handleChange = (e:InputType) =>{
        setErrors({
            ...errors,
            [e.target.name]:null!
        })
        setFormData({
            [e.target.name]:e.target.value,
        });
    }  

    
    /* Handle validation of form */
    const handleValidation = () => {
        let formIsValid = true;
        const newErrors = {
            email: '',
            password: ''
        };

        if (!formData.email) {
            formIsValid = false;
            newErrors['email'] = "Cannot be empty";
        }

        if (typeof formData.email !== "undefined") {
            let lastAtPos = formData.email.lastIndexOf('@');
            let lastDotPos = formData.email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && formData.email.indexOf('@@') === -1 && lastDotPos > 2 && (formData.email.length - lastDotPos) > 2)) {
                formIsValid = false;
                newErrors["email"] = "Email is not valid";
            }
        }


        if (!formData.password) {
            formIsValid = false;
            newErrors["password"] = "Cannot be empty";
        }



        setErrors({
            ...errors,
            ...newErrors,
        });
        return formIsValid;
    }

     /* Handle login */
     const handleLogin = async () =>{
        if(handleValidation()){
          setErrors({  
            email:'',
            password:''
          });


          try{
            const responseData:any = await loginUser(formData);
            if(responseData){
              console.log(responseData)
              setToken(responseData.data.accessToken);
              history.push('/');
            }
            
          }catch(err){
            
            if (err.response) {
              const errResponseData = err.response.data;
              setFlash({ message: errResponseData.message, type: 'error' })
              return;
            }else{
              setFlash({ message: err.message, type: 'error' })
            }
            return;
          }
          
        }
    }
    

    const classes = useStyle();

    if(token){
      return (
        <Redirect to="/" />
      )
    }

    return (
        <div className={classes.loginPage}>
            <Typography variant="h4">Login</Typography>
           
            <div className={classes.form}>
                

                <InputField handleChange={handleChange} name="email" label="Email" type="text" error={errors.email}  />
                <InputField handleChange={handleChange} name="password" label="Password" type="password" error={errors.password}  />
                
                <Button variant="contained" size="medium" onClick={handleLogin} className={classes.buttonLogin} color="primary">
                    Login
                </Button>
    
                <Button 
                    variant="outlined"
                    size="medium" 
                    onClick={()=>{history.push('/signup')}}
                    className={classes.buttonSignup} >
                    Register
                </Button>
            </div>
        </div>
    )
}



export default Login;

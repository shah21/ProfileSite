import { Typography, Button } from '@material-ui/core';
import React from 'react'
import { Redirect, useHistory } from 'react-router-dom';

import axios from "../../axios/config";
import endpoints from '../../axios/endpoints';
import InputField from '../../components/Form/InputField';
import { FlashContext, TokenContext } from '../../contexts/context';
import { useStyle } from "./styles";

/* Signup request func */
const signupUser = async (credentails:object) =>{

    try {
      const response = await axios.post(endpoints.signup, JSON.stringify(credentails), {
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

function Signup() {

    const [formData, setFormData] = React.useReducer(formReducer, {});
    const [errors, setErrors] = React.useState({
        email:null! as string,
        password:null! as string ,
        confirm_password:null! as string,
        name:null! as string
      });  
    
    const {token} = React.useContext(TokenContext);
    
    const history = useHistory();  
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
            password: '',
            confirm_password:'',
            name:''
        };

        if (!formData.name) {
            formIsValid = false;
            newErrors["name"] = "Cannot be empty";
        } else if (formData.name.length < 3) {
            formIsValid = false;
            newErrors["name"] = "Name must have atleast 3 characters long";
        }

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
        } else if (formData.password.length < 6) {
            formIsValid = false;
            newErrors["password"] = "Password must have atleast 6 characters long";
        }

        if (!formData.confirm_password) {
            formIsValid = false;
            newErrors['confirm_password'] = "Cannot be empty";
        } else {
            if (formData.password !== formData.confirm_password) {
                formIsValid = false;
                newErrors["confirm_password"] = "Passwords must be same";
            }
        }

    



        setErrors({
            ...errors,
            ...newErrors,
        });
        return formIsValid;
    }

     /* Handle signup */
     const handleSignup = async () =>{
        if(handleValidation()){
          setErrors({  
            email:'',
            password:'',
            confirm_password:'',
            name:''
          });


          try{
            const responseData:any = await signupUser(formData);
            if(responseData){
              setFlash({message:'Account created successfully!.',type:'success'})
              history.push('/login');
            }
            
          }catch(err){
            
            if (err.response) {
              const errResponseData = err.response.data;
              console.log(errResponseData);
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
        console.log(token);
        return (
          <Redirect to="/" />
        )
      }

    return (
        <div className={classes.loginPage}>
            <Typography  variant="h4">Signup</Typography>
           
            <div className={classes.form}>
                

                <InputField handleChange={handleChange} name="name" label="Name" type="text" error={errors.name}  />
                <InputField handleChange={handleChange} name="email" label="Email" type="text" error={errors.email}  />
                <InputField handleChange={handleChange} name="password" label="Password" type="password" error={errors.password}  />
                <InputField handleChange={handleChange} name="confirm_password" label="Confirm Password" type="password" error={errors.confirm_password}  />
                
                <Button variant="contained" size="medium"  onClick={handleSignup} className={classes.buttonLogin} color="primary">
                    Register
                </Button>
    
                <Button 
                    variant="outlined"
                    size="medium" 
                    onClick={()=>{history.push('/login')}}
                    className={classes.buttonSignup} >
                    Login
                </Button>
            </div>
        </div>
    )
}



export default Signup;

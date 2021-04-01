import { Typography,Card, Button, Container, CircularProgress } from '@material-ui/core';
import Cookies from 'js-cookie';
import React from 'react'


import axios from "../../axios/config";
import endpoints from '../../axios/endpoints';
import EditableTextView from '../../components/EditableViews/EditableTextView';
import { FlashContext, TokenContext } from '../../contexts/context';
import User from '../../models/user';
import { useStyle } from "./styles";


/* Update user api call */
const updateUser = async (credentails: object,token:string) => {
    try {
        const response = await axios.patch(endpoints.updateUser, JSON.stringify(credentails),{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        throw err
    }
}

/* Get user api call */
const getUser = async (token:string) => {
    try {
        const response = await axios.get(endpoints.getUser,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        console.log(err);
        return err;
    }
}

/* For clear all cookies */
const removeCookies = () =>{
    return new Promise((resolve,reject)=>{
        Object.keys(Cookies.get()).forEach(function (cookie) {
            Cookies.remove(cookie);
            if(Object.keys(Cookies.get()).length === 0){
                resolve(true);
            }
        });
    })
    
}



function Profile() {

    /* state */
    const [errors, setErrors] = React.useState({
        name:null! as string,
        age:null! as string, 
        gender:null! as string, 
      });  
    const [userData,setUserData] =  React.useState<User>(null!)
    const [isLoading, setLoading] = React.useState<boolean>(false);
    

    /* contexts */
    const {token,setToken} = React.useContext(TokenContext);
    const {setFlash} = React.useContext(FlashContext);

      
    React.useEffect(() => {
        /* Prepare user data */
        async function setUserProfile() {
            setLoading(true)
            try {
                const response = await getUser(token);
                setLoading(false)
                if (response && response.user) {
                    const user = response.user;
                    setUserData(user);
                }
            } catch (err) {
                setLoading(false)
                console.log(err)
            }
        }
        setUserProfile();
    }, [token]);

    
    /* Validate fields */
    const handleValidation = (val:string,field:string) => {
        let formIsValid = true;
        let newErrors:any = {};

        if(val){
            if(field === 'name' && val.length < 3){
                newErrors[field] = 'Name must have atleast 3 characters long';
                formIsValid = false;
            }

            if(field === 'gender' && val === 'Select'){
                formIsValid = false;
            }

        }else{
            newErrors[field] = 'Cannot be empty';
            formIsValid = false;
        }
        



        setErrors({
            ...errors,
            ...newErrors,
        });
        return formIsValid;
    }

     /* Handle save updates */
    const handleSave = async (value:string,field:string,updated:()=>void) =>{

        if (handleValidation(value, field)) {
            let data:any={};
            data[field] = value; 

            setErrors({
                name: null! as string,
                age: null! as string,
                gender: null! as string,
            });

            try {
                const responseData: any = await updateUser(data,token);
                if (responseData) {
                    setFlash({ message: 'Profile updated successfully!.', type: 'success' })
                    setUserData({
                        ...userData,
                        [field]:value
                    });
                    /* callback to notify updation success */
                    updated();
                }

            } catch (err) {
                if (err.response) {
                    const errResponseData = err.response.data;
                    setFlash({ message: errResponseData.message, type: 'error' })
                } else {
                    setFlash({ message: err.message, type: 'error' })
                }
                return;
            }
        }
    }

    /* Handle logout functionality */
    const handleLogout = () => {
        removeCookies().then(result=>{
            if(result){
                setToken(null!);
                window.location.href = '/';
            }
        });
    }
    
    
    /* Styles */
    const classes = useStyle();


    return (
        <div className={classes.homePage}>
            <Container maxWidth="sm">
            <Typography variant="h4" >Profile {isLoading && <CircularProgress className={classes.progress} color="primary" size={30} />}</Typography>

            {/* Check user data available or not */}
            {userData && (
            <Card className={classes.container}>

                <Typography className={classes.label} variant="body1">Email</Typography>
                <Typography variant="subtitle2" >{userData.email}</Typography>

                <EditableTextView
                    label="Name"
                    error={errors.name}
                    type="text"
                    name="name"
                    value={userData.name}
                    handleSave={handleSave} />

                <EditableTextView
                    label="Age"
                    error={errors.age}
                    type="number"
                    name="age"
                    value={userData.age}
                    handleSave={handleSave} />

                <EditableTextView
                    label="Gender"
                    error={errors.gender}
                    type="select"
                    name="gender"
                    value={userData.gender}
                    handleSave={handleSave} />    


            </Card>
            )}

            <Button 
                className={classes.btnLogout}
                onClick={handleLogout}
                size="small" 
                color="secondary" 
                variant="outlined">
                    Logout
                </Button>

                </Container>    
        </div>
    )
}



export default Profile;

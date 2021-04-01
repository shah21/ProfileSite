import { Typography,Card, Button } from '@material-ui/core';
import Cookies from 'js-cookie';
import React from 'react'


import axios from "../../axios/config";
import endpoints from '../../axios/endpoints';
import EditableTextView from '../../components/EditableViews/EditableTextView';

import { FlashContext, TokenContext } from '../../contexts/context';
import User from '../../models/user';
import { useStyle } from "./styles";


const updateUser = async (credentails:object,token:string) =>{

    try {
      const response = await axios.patch(endpoints.updateUser, JSON.stringify(credentails), {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      });
      return response.data;
    } catch (err) {
      throw err
    }
}


const getUser = async (token:string) =>{
    if (token) {
        try {
            const response = await axios.get(endpoints.getUser, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": "Bearer " + token,
                }
            });
            return response.data;
        } catch (err) {
            console.log(err);
            return err;
        }
    } 
}

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
    

    /* contexts */
    const {token,setToken} = React.useContext(TokenContext);
    const {setFlash} = React.useContext(FlashContext);


    React.useEffect(() => {
        async function setUserProfile() {
            try {
                const response = await getUser(token);
                if (response && response.user) {
                    const user = response.user;
                    setUserData(user);
                }
            } catch (err) {
                console.log(err)
            }
        }
        setUserProfile();
    }, [token]);

    
    /* Handle validation of form */
    const handleValidation = (val:string,field:string) => {
        let formIsValid = true;
        let newErrors:any = {};

        if(val){
            if(field === 'name' && val.length < 3){
                newErrors[field] = 'Name must have atleast 3 characters long';
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

     /* Handle login */
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
                    updated();
                }

            } catch (err) {

                if (err.response) {
                    const errResponseData = err.response.data;
                    setFlash({ message: errResponseData.message, type: 'error' })
                    return;
                } else {
                    setFlash({ message: err.message, type: 'error' })
                }
                return;
            }
        }
    }

    const handleLogout = () => {
        removeCookies().then(result=>{
            if(result){
                setToken(null!);
                window.location.href = '/';
            }
        });
    }
    
    

    const classes = useStyle();
    return (
        <div className={classes.homePage}>
            <Typography variant="h4" >Profile</Typography>

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
                    value={userData.age.toString()}
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
        </div>
    )
}



export default Profile;

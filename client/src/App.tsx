import React from 'react';
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";

import './App.css';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { FlashContext, TokenContext } from './contexts/context';
import CustomizedSnackbar from './components/CustomizedSnackbar/CustomizedSnackbar';
import { useToken } from './hooks/useToken';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Profile from "./pages/user/Profile";



function App() {

  /* States */
  const {token,setToken} = useToken();
  const [flash, setFlash] = React.useState<FlashType>(null!); 
  const [open, setOpen] = React.useState<boolean>(false); 

  /* Check Flash Messages */
  React.useEffect(()=>{
    if(flash){
      setOpen(true);
    }
  },[flash])
  const handleClose = () => {
      setOpen(false);
  }
  
  

    /* app routes */
    let routes = (
      <Router>
        <Switch>
          <Route exact path="/login"  render={()=>(<Login /> )} />
          <Route exact path="/signup"  render={()=>(<Signup />)}/>
          <ProtectedRoute exact path="/" token={token} component={Profile} authenticationPath="/login"/>
        </Switch>
      </Router>
    );

  return (
    <div className="app">
      <FlashContext.Provider value={{ flash, setFlash }}>
      <TokenContext.Provider value={{token,setToken}}>
      {routes}
      </TokenContext.Provider>
      <CustomizedSnackbar key="snackbar" openState={open} handleClose={handleClose} mode={flash && flash.type} message={flash && flash.message} />
      </FlashContext.Provider>
    </div>
  );
}

export default App;

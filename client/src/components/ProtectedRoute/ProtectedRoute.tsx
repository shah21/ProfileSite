import React from "react";
import { Route, Redirect, RouteProps} from "react-router-dom";


export interface ProtectedRouteProps extends RouteProps {
    token: string;
    path: string;
    authenticationPath: string;
  }
  
  export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {

    let redirectPath = '';

    
    if (!props.token) {
      redirectPath = props.authenticationPath;
    }
  
    if (redirectPath) {
      const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
      return <Route {...props} component={renderComponent} render={undefined} />;
    } else {
      return <Route {...props} />;
    }
  };

export default ProtectedRoute;
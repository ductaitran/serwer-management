import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { authenticationService } from '../services/authentication.service';

export default function PrivateRoute({ children, roles, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
      {
        const currentUser = JSON.parse(authenticationService.currentUserValue);
        if (!currentUser) {          
          return <Redirect to={{ pathname: '/signin', state: { from: location } }} />      
        }

        if (roles && roles.indexOf(currentUser.role) === -1) {
          return <Redirect to='/' />
        }
        // console.log(currentUser)
        return children
      }
        // localStorage.getItem('currentUser') ? (
        //   children
        // ) : (
        //     // <Redirect to='/signin' />
        //     <Redirect to={{ pathname: '/signin', state: { from: location } }} />      
        //   )
      }
    />
  );
}
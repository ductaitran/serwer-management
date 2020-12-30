import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem('currentUser') ? (
          children
        ) : (
            // <Redirect to='/signin' />
            <Redirect to={{ pathname: '/signin', state: { from: location } }} />      
          )
      }
    />
  );
}
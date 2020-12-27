import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {
  const ACCESS_TOKEN_NAME = ''
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem(ACCESS_TOKEN_NAME) ? (
          children
        ) : (
            <Redirect to='/signin' />
          )
      }
    />
  );
}

export default PrivateRoute;
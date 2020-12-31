import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './utils/privateRoute';

import './App.css';

import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { authenticationService } from './services/authentication.service';
import { userService } from './services/user.service';

// Fake Route, will be replaced with real component later




const Contact = () => (
  <div>
    <h1>Contact Page</h1>
  </div>
)

const Schedule = () => (
  <div>
    <h1>Schedule Page</h1>
  </div>
)

const Monitor = () => (
  <div>
    <h1>Monitor Page</h1>
  </div>
)

const Error = () => (
  <div>
    <h1>404</h1>
  </div>
)

export default function App() {
  const [currentUser, setCurrenUser] = useState(null);

  function showAllUsers() {
    const email = JSON.parse(currentUser).email    
    console.log(userService.getOne(email));
  }

  const HomePage = () => (
    <div>
      <h1>Home Page</h1>
      <button onClick={showAllUsers}>users</button>
    </div>
  )

  useEffect(() => {
    authenticationService.currentUser.subscribe(x => setCurrenUser(x));        
  });

  return (
    <div>
      <Header currentUser={currentUser} />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/signin' component={SignInAndSignUpPage} />
        <PrivateRoute exact path='/monitor'>
          <Monitor />
        </PrivateRoute>
        <PrivateRoute exact path='/schedule'>
          <Schedule />
        </PrivateRoute>
        <Route exact path='/contact' component={Contact} />
        <Route component={Error} />
      </Switch>
    </div>
  );
}

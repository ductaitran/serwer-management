import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import PrivateRoute from './utils/privateRoute';

import './App.css';

import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import MonitorPage from './pages/monitor/monitor.component';
import SchedulePage from './pages/schedule/schedule.component';

import { authenticationService } from './services/authentication.service';
import { userService } from './services/user.service';
import { sewerService } from './services/sewer.service';
import { Role } from './helpers/role';

// Fake Route, will be replaced with real component later




const Contact = () => (
  <div>
    <h1>Contact Page</h1>
  </div>
)

const Admin = () => (
  <div>
    <h1>Admin</h1>
  </div>
)

const Error = () => (
  <div>
    <h1>404</h1>
  </div>
)

export default function App() {
  const [currentUser, setCurrenUser] = useState(null);
  const history = useHistory();

  function showAllUsers() {
    if (currentUser) {
      const email = JSON.parse(currentUser).email;
      var name = '';
      userService.getByEmail(email)
        .then(result => {
          console.log(JSON.parse(result));
          name = JSON.parse(result).name;
          console.log(name);
          if (name === "Duc Tai")
            document.getElementById("username").innerHTML = "<button>Duc Tai</button>"
        });
      // console.log(userService.getAll())
    } else {
      history.push('/signin');
    }

  }

  function showAllSewers() {
    if (currentUser) {
      sewerService.getAll()
        .then(result => console.log(result))
    }
  }

  const HomePage = () => (
    <div>
      <h1>Home Page</h1>
      <button onClick={showAllUsers}>users</button>
      <button onClick={showAllSewers}>sewers</button>
      <div id="username"></div>
    </div>
  )

  useEffect(() => {
    authenticationService.currentUser.subscribe(x => setCurrenUser(x));
  });

  return (
    <div>
      <Header currentUser={JSON.parse(currentUser)} />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/signin' component={SignInAndSignUpPage} />
        <PrivateRoute exact path='/monitor' roles={[Role.Admin, Role.User]}>
          <MonitorPage />
        </PrivateRoute>
        <PrivateRoute exact path='/schedule'>
          <SchedulePage />
        </PrivateRoute>
        <PrivateRoute exact path='/admin' roles={[Role.Admin]}>
          <Admin />
        </PrivateRoute>
        <Route exact path='/contact' component={Contact} />
        <Route component={Error} />
      </Switch>
    </div>
  );
}

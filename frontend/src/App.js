import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './utils/privateRoute';

import './App.css';

import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

// Fake Route, will be replaced with real component later
const HomePage = () => (
  <div>
    <h1>Home Page</h1>
  </div>
)

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

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />         
          <Route exact path='/signin' component={SignInAndSignUpPage} />
          <PrivateRoute exact path='/monitor'>
            <Monitor />
          </PrivateRoute>
          <PrivateRoute exact path='/schedule'>
            <Schedule />
          </PrivateRoute>                    
          <Route path='/contact' component={Contact} />
        </Switch>
      </div>
    )
  }
}

export default App;

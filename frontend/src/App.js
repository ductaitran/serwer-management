import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import SignInPage from './pages/sign-in/sign-in-page.component';

// Fake Route, will be replaced with real component later
const HomePage = () => (
  <div>
    <h1>Home Page</h1>
  </div>
)

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/signin' component={SignInPage} />
      </Switch>
    </div>
  );
}

export default App;

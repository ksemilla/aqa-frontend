import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthContainer from "./containers/AuthContainer"

import { Login } from "./views"
import { Home } from "./views"

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/auth/login/' component={Login} exact />
        <AuthContainer>
          <Route path='/' component={Home} exact />
        </AuthContainer>
      </Switch>
    </Router>
  );
}

export default App;

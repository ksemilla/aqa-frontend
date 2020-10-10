import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthContainer from "./containers/AuthContainer"

import Nav from "./components/Nav"
import Footer from "./components/Footer"

import { Login } from "./views"
import { Home } from "./views"
import { ProductList } from "./views"

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/auth/login/' component={Login} exact />
        <AuthContainer>
          <Nav />
          <Route path='/' component={Home} exact />
          <Route path='/products' component={ProductList} exact />
          <Footer />
        </AuthContainer>
      </Switch>
    </Router>
  );
}

export default App;

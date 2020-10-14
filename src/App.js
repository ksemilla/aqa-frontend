import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthContainer from "./containers/AuthContainer"

import Nav from "./components/Nav"
import Footer from "./components/Footer"

import { Login } from "./views"
import { Home } from "./views"
import { ProductList, ProductCreate, ProductDetail, ProductEdit } from "./views"
import { QuotationList, QuotationCreate } from "./views"

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
          <Route path='/products/create' component={ProductCreate} exact />
          <Route path='/product/:id' component={ProductDetail} exact />
          <Route path='/product/:id/edit' component={ProductEdit} exact />

          <Route path='/quotations' component={QuotationList} exact />
          <Route path='/quotations/create' component={QuotationCreate} exact />
          {/* <Route path='/quotation/:id' component={QuotationDetail} exact /> */}
          {/* <Route path='/quotation/:id/edit' component={QuotationEdit} exact /> */}
          {/* <Footer /> */}
        </AuthContainer>
      </Switch>
    </Router>
  );
}

export default App;

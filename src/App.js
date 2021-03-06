import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthContainer from "./containers/AuthContainer"

import Nav from "./components/Nav"
import Footer from "./components/Footer"

import { Login } from "./views"
import { Home } from "./views"
import { ProductList, ProductCreate, ProductDetail, ProductEdit } from "./views"
import { QuotationList, QuotationCreate, QuotationDetail, QuotationEdit } from "./views"

import { AdminDashBoard, EmployeeList, EmployeeCreate, EmployeeEdit } from "./views" 

import { Page404 } from "./views"

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Router>
      <Switch>
        <Route path='/auth/login' component={Login} exact />
        <AuthContainer>
          <Nav />
          <Route exact path='/' component={Home} />

          <Route path='/products' component={ProductList} exact />
          <Route path='/products/create' component={ProductCreate} exact />
          <Route path='/product/:id' component={ProductDetail} exact />
          <Route path='/product/:id/edit' component={ProductEdit} exact />

          <Route path='/quotations' component={QuotationList} exact />
          <Route path='/quotations/create' component={QuotationCreate} exact />
          <Route path='/quotation/:id' component={QuotationDetail} exact />
          <Route path='/quotation/:id/edit' component={QuotationEdit} exact />

          <Route path='/admin' component={AdminDashBoard} exact />
          <Route path='/admin/employees' component={EmployeeList} exact />
          <Route path='/admin/employees/create' component={EmployeeCreate} exact />
          <Route path='/admin/employee/:id' component={EmployeeEdit} exact />

          {/* <Route path='/404' component={Page404} /> */}
          {/* <Redirect to="/404" /> */}
          {/* <Footer /> */}
        </AuthContainer>
      </Switch>
    </Router>
  );
}

export default App;

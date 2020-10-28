import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { StoreContext } from "./store"
import ProductService from "./api/Product"

import AuthContainer from "./containers/AuthContainer"

import Nav from "./components/Nav"
import Footer from "./components/Footer"

import { Login } from "./views"
import { Home } from "./views"
import { ProductList, ProductCreate, ProductDetail, ProductEdit } from "./views"
import { QuotationList, QuotationCreate } from "./views"
import { Page404 } from "./views"

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const store = useContext(StoreContext)
  const service = new ProductService()

  useEffect(()=>{
    service.getAll()
    .then(res=>{
      store.setProducts(res.data)
    })
    
  }, [])

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
          {/* <Route path='/quotation/:id' component={QuotationDetail} exact /> */}
          {/* <Route path='/quotation/:id/edit' component={QuotationEdit} exact /> */}

          {/* <Route path='/404' component={Page404} /> */}
          {/* <Redirect to="/404" /> */}
          {/* <Footer /> */}
        </AuthContainer>
      </Switch>
    </Router>
  );
}

export default App;

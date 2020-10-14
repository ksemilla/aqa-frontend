import React, { useContext } from 'react';

import { StoreContext } from "../store"
import { useObserver } from "mobx-react";
import { AuthService } from "../api/Auth"

import { Redirect, useHistory } from 'react-router-dom';

const AuthContainer = ({children}) => {
  const store = useContext(StoreContext)
  const history = useHistory()
  const token = localStorage.getItem("token")

  if (useObserver(() => !store.isLogged)) {
    if (token) {
      let service = new AuthService()
      service.verifyToken(token)
      .then(res => {
        store.logUserIn(res.data.user)
        return (<Redirect to="/" />)
      })
      .catch(res=>{
        let refresh = localStorage.getItem("refresh")
        if (refresh) {

          service.refreshToken(refresh)
          .then(res=>{
            store.logUserIn(res.data.user)
            localStorage.setItem("token", res.data.access)
            return (<Redirect to="/" />)
          })
          .catch(res=>{
            localStorage.removeItem("token")
            localStorage.removeItem("refresh")
            localStorage.removeItem("userId")
            return (<Redirect to="/auth/login/" />)
          })
        } else {
          console.log("GOT HERE 7")
          history.push("/auth/login/")
        }
      })
    } else {
      return (<Redirect to="/auth/login/" />)
    }
    
  } else {
    return (<React.Fragment>{children}</React.Fragment>)
  }
  return (<React.Fragment>{children}</React.Fragment>)
}

export default AuthContainer

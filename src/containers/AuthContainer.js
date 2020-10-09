import React, { useContext } from 'react';
import { StoreContext } from "../store"
import { useObserver } from "mobx-react";
import { AuthService } from "../api/Auth"

import { Redirect } from 'react-router-dom';

const AuthContainer = ({children}) => {
  const store = useContext(StoreContext)
  const token = localStorage.getItem("token")

  console.log("GOT HERE")

  if (useObserver(() => !store.isLogged) && token) {
    let service = new AuthService()
    service.verifyToken(token)
    .then(res => {
      store.logUserIn(res.data.user)
    })
    .catch(res=>{
      let refresh = localStorage.getItem("refresh")
      if (refresh) {
        service.refreshToken(refresh)
        .then(res=>{
          store.logUserIn(res.data.user)
          localStorage.setItem("token", res.data.access)
        })
        .catch(res=>{
          localStorage.removeItem("token")
          localStorage.removeItem("refresh")
          localStorage.removeItem("userId")
          return (<Redirect to="/auth/login/" />)
        })
      } else {
        localStorage.removeItem("token")
        localStorage.removeItem("refresh")
        localStorage.removeItem("userId")
        return (<Redirect to="/auth/login/" />)
      }
    })
  } else {
    localStorage.removeItem("token")
    localStorage.removeItem("refresh")
    localStorage.removeItem("userId")
    return (<Redirect to="/auth/login/" />)
  }

  return (<React.Fragment>{children}</React.Fragment>)
}

export default AuthContainer

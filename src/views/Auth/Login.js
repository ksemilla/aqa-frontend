import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom';
import { useObserver } from "mobx-react";

import { StoreContext } from "../../store"

import { LoginService } from "../../api/Auth"

import styled from "styled-components"

const LoginContainer = styled.div`
  margin: auto;
  width: 24rem;
`

function Login() {

  const store = useContext(StoreContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = event => {
    event.preventDefault()
    let service = new LoginService()
    service.logIn({
      username: email, password
    })
    .then(res=>{
      store.logUserIn(res.data.user)
      localStorage.setItem("token", res.data.access)
      localStorage.setItem("refresh", res.data.refresh)
    })
  }


  if (useObserver(() => store.isLogged)) {
    return <Redirect to="/" />
  } 

  return (
    <div style={{width: "100%"}}>
      <div style={{margin: "auto", width: "900px", textAlign: "center", marginTop: "8rem", marginBottom: "3rem"}}>
        <div style={{color: "#1c93e8", fontSize: "5rem", fontWeight: "500"}}>AQA</div>
        <div>Create your quotation through our app!</div>
      </div>
      <LoginContainer>
        <form style={{padding: "1rem"}} onSubmit={onSubmit}>
          <div style={{display: "flex"}}>
            <span style={{flex: "1"}}>Email</span>
            <input style={{flex: "3"}} onChange={e=>setEmail(e.target.value)}/>
          </div>
          <div style={{display: "flex"}}>
            <span style={{flex: "1"}}>Password</span>
            <input style={{flex: "3"}} onChange={e=>setPassword(e.target.value)}/>
          </div>
          <button style={{width: "100%"}}>Login</button>
        </form>
      </LoginContainer>
    </div>
  )
}

export default Login

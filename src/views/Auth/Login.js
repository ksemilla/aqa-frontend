import React, { useState, useContext } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { useObserver } from "mobx-react";

import { StoreContext } from "../../store"

import { LoginService, AuthService } from "../../api/Auth"

import styled from "styled-components"

const LoginContainer = styled.div`
  margin: auto;
  width: 24rem;
`

const Button = styled.button`
  width: 100%;
  border: none;
  margin: 1rem 0rem;
  padding: 0.5rem;
  background-color: rgba(28, 147, 232, 0.9);
  border-radius: 5px;
  &:hover {
    background-color: rgba(28, 147, 232, 1);
  }
`

function Login() {

  const store = useContext(StoreContext)
  const history = useHistory()

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
      history.push("/")
    })
  }

  const token = localStorage.getItem("token")

  if (token) {
    let service = new AuthService()
    service.verifyToken(token)
    .then(res=>{
      store.logUserIn(res.data.user)
      return <Redirect to="/" />
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
          <div style={{}}>
            <div>Username</div>
            <input onChange={e=>setEmail(e.target.value)} style={{width: "100%"}}/>
          </div>
          <div>
            <div>Password</div>
            <input type="password" onChange={e=>setPassword(e.target.value)} style={{width: "100%"}}/>
          </div>
          <Button>Login</Button>
        </form>
      </LoginContainer>
    </div>
  )
}

export default Login

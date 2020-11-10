import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"

import { Container } from "./../../styles/Containers"
import { CursorPointer } from "./../../styles/elements/CursorPointer"

import UserService from "./../../api/User"
import Form from "./EmployeeForm"

function EmployeeCreate() {

  const [employee, setEmployee] = useState({
    username: "",
    email: "",
    password: "",
    scope: "ae",
    first_name: "",
    last_name: ""
  })

  const onChange = e => {
    e.preventDefault()
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    let service = new UserService()
    service.create(employee)
    .then(res=>{
      console.log(res)
    })
    .catch(res=>{
      console.log(res.response)
    })
  }

  return (
    <Container style={{padding: "0.5rem"}}>
      Employee Create
      <Form data={employee} onSubmit={onSubmit} onChange={onChange} />
    </Container>
  )
}

export default EmployeeCreate

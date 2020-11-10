import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"

import { Container } from "./../../styles/Containers"
import { CursorPointer } from "./../../styles/elements/CursorPointer"

import UserService from "./../../api/User"

function EmployeeList() {
  const history = useHistory()
  const [employees, setEmployees] = useState([])

  useEffect(()=>{
    let service = new UserService()
    service.getList()
    .then(res=>{
      setEmployees(res.data.results)
    })
    .catch(res=>{
      console.log(res.response)
    })
  }, [])

  return (
    <Container style={{padding: "0.5rem"}}>
      <div>Employees</div>
      <CursorPointer onClick={()=>history.push("/admin/employees/create")}>
        Add new
      </CursorPointer>
      {
        employees.map((emp, idx)=>(
          <CursorPointer key={idx} onClick={()=>history.push(`/admin/employee/${emp.id}`)}>{emp.email}</CursorPointer>
        ))
      }
    </Container>
  )
}

export default EmployeeList

import React from 'react'
import { useHistory } from "react-router-dom"

import { Container } from "./../../styles/Containers"
import { CursorPointer } from "./../../styles/elements/CursorPointer"

function Dashboard() {
  const history = useHistory()
  return (
    <Container>
      <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
        <CursorPointer
          style={{margin: "1rem", border: "1px solid #192445", borderRadius: "5px", padding: "1rem", color: "#192445"}}
          onClick={()=>history.push("/admin/employees")}
        >
         Employee 
        </CursorPointer>
      </div>
    </Container>
  )
}

export default Dashboard

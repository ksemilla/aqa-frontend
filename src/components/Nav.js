import React, { useContext } from 'react'
import { Link, useLocation } from "react-router-dom"

import { StoreContext } from "../store"

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

import styled from "styled-components"

const PillItem = styled(Link)`
  padding: 0.5rem;
  color: ${props=>props.color};
  margin: 0rem 0.25rem;
  background-color: ${props=>props.bgColor};
  border-radius: 5px;
  &:hover {
    color: black;
    text-decoration:none;
    background-color: #007bff;
  }
`

function NavComponent() {
  const store = useContext(StoreContext)
  const location = useLocation()

  const page = location.pathname.split("/")[1]

  return (
    <div style={{width: "100%"}}>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">AQA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Item>
              <PillItem to="/quotations" color={page==="quotations" ? "black" : "rgba(0,0,0,.5)"} bgColor={page==="quotations" ? "#007bff" : ""}>Quotations</PillItem>
            </Nav.Item>
            <Nav.Item>
              <PillItem to="/products" color={page==="products" ? "black" : "rgba(0,0,0,.5)"} bgColor={page==="products" ? "#007bff" : ""}>Products</PillItem>
            </Nav.Item>
          </Nav>
          <Nav>
            <NavDropdown title={<span>Settings</span>} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">My Account</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/auth/login" onClick={()=>{store.logUserOut()}}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default NavComponent

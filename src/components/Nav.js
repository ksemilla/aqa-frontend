import React, { useContext } from 'react'
import { Link, useLocation, useHistory } from "react-router-dom"

import { StoreContext } from "../store"

// import Nav from 'react-bootstrap/Nav'
// import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

import { Container } from "../styles/Containers"

import styled from "styled-components"

const PillItem = styled(Link)`
  padding: 0.5rem;
  color: white;
  margin: 0rem 0.25rem;
  background-color: ${props=>props.bgcolor};
  border-radius: 5px;
  &:hover {
    color: white;
    text-decoration:none;
    background-color: #26345e;
  }
`

const Settings = styled.span`
  color: rgba(225,225,225,0.8);
  font-size: 1.4rem;
  &:hover {
    cursor: pointer;
    color: rgba(225,225,225,1);
  }

`

const LogoText = styled.div`
  flex: 1;
  font-size: 1.5rem;
  color: rgba(225,225,225,0.9);
  &:hover {
    color: white;
    cursor: pointer;
  }
`

function NavComponent() {
  const store = useContext(StoreContext)
  const location = useLocation()
  const history = useHistory()
  const page = location.pathname.split("/")[1]

  return (
    <div style={{width: "100%", color: "white", backgroundColor: "#192445"}}>
      <Container style={{display: "flex", padding: "0.5rem", alignItems: "center"}}>
        {/* <Navbar bg="#192445" expand="lg">
          <Navbar.Brand href="/">
            <div style={{color: "rgba(255,255,255,0.8)"}}>AQA</div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Item>
                <PillItem to="/quotations" color={page==="quotations" ? "black" : "rgba(0,0,0,.5)"} bgcolor={page==="quotations" ? "#007bff" : ""} >Quotations</PillItem>
              </Nav.Item>
              <Nav.Item>
                <PillItem to="/products" color={page==="products" ? "black" : "rgba(0,0,0,.5)"} bgcolor={page==="products" ? "#007bff" : ""} >Products</PillItem>
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
        </Navbar> */}
        <LogoText onClick={()=>history.push("/")}>AQA</LogoText>
        <div style={{flex: 1, display: "flex", justifyContent: "center"}}>
          <PillItem to="/quotations" bgcolor={page==="quotations" || page==="quotation" ? "#26345e" : ""} >Quotations</PillItem>
          <PillItem to="/products" bgcolor={page==="products" || page==="product" ? "#26345e" : ""} >Products</PillItem>
        </div>
        <div style={{flex: 1, display: "flex", justifyContent: "flex-end"}}>
          <NavDropdown title={<Settings><i className="fa fa-cog" aria-hidden="true"></i></Settings>} id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">My Account</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/auth/login" onClick={()=>{store.logUserOut()}}>Logout</NavDropdown.Item>
          </NavDropdown>
        </div>
      </Container>
    </div>
  )
}

export default NavComponent

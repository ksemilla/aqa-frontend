import React, { useContext } from 'react'

import { StoreContext } from "../store"

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

function NavComponent() {
  const store = useContext(StoreContext)
  return (
    <div style={{width: "100%"}}>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">AQA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* <Nav className="mr-auto">
            <Nav.Link href="/quotations">Quotations</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
          </Nav> */}
          <Nav variant="pills" defaultActiveKey="/">
            {/* <Nav.Item>
              <Nav.Link href="/home">Active</Nav.Link>
            </Nav.Item> */}
            <Nav.Item>
              <Nav.Link eventKey="link-1" href="/quotations">Quotations</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2" href="/products">Products</Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav>
            <NavDropdown title={`Test`} id="basic-nav-dropdown">
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

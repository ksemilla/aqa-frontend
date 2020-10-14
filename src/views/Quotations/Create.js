import React, { useState } from 'react'
import { useHistory } from "react-router-dom"

import ProductService from "../../api/Product"

import Container from 'react-bootstrap/Container'
import styled from "styled-components"

const Button = styled.button`
  &:hover {
    cursor: pointer;
  }
`

function Create() {

  let service = new ProductService()
  const history = useHistory()
  const [data, setData] = useState({
    company_name: ""
  })

  const onSubmit = e => {
    e.preventDefault()
    let newData = {
      ...data,
      sell_price: data.sell_price * 100,
      cost_price: data.cost_price * 100,
      stock_qty: data.stock_qty * 100
    }
    service.query(data.company_name)
    

  }

  const onChange = e => {
    let value = e.target.value
    if (e.target.name === "sell_price" || e.target.name === "cost_price" || e.target.name === "stock_qty") {
      value = parseFloat(e.target.value)
    }
    setData({
      ...data,
      [e.target.name]: value
    })
  }

  return (
    <Container>
      <div>Creating new Quotation</div>
      <form onSubmit={onSubmit}> 
        <div>
          <div>Company Name</div>
          <input name="company_name" value={data.company_name} onChange={onChange}/>
        </div>
       
        <Button type="submit">Add</Button>
      </form>
    </Container>
  )
}

export default Create

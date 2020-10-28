import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom"

import ProductService from "../../api/Product"
import QuotationService from "../../api/Quotation"

import CreateInline from "./CreateInline"

import { v4 as uuidv4 } from 'uuid';
import Container from 'react-bootstrap/Container'
import styled from "styled-components"

const Button = styled.button`
  &:hover {
    cursor: pointer;
  }
`

function Create() {

  let service = new QuotationService()
  const history = useHistory()
  const [data, setData] = useState({
    company_name: "",
    subject: "",
    project: "",
    payment_terms: "",
    location: "",
    discount: 0,
    items: []
  })

  const addItem = e => {
    e.preventDefault()
    let tempData = JSON.parse(JSON.stringify(data))
    tempData.items.push({
      key: uuidv4(),
      line_number: tempData.items.length,
      product: 0
    })
    setData(tempData)
  }

  const removeItem = key => {
    let tempData = JSON.parse(JSON.stringify(data))
    tempData.items = tempData.items.filter(item => item.key !== key)
    setData(tempData)
  }

  const itemChange = newDdata => {
    let tempData = JSON.parse(JSON.stringify(data))
    tempData.items[newDdata.idx].product = parseFloat(newDdata.product)
    console.log(tempData.items)
    setData(tempData)
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

  const onSubmit = e => {
    e.preventDefault()
    let newData = {
      ...data
    }
    console.log(newData)
    service.create(newData)
    .then(res=>{
      console.log(res)
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
        <div>
          <div>Subject</div>
          <input name="subject" value={data.subject} onChange={onChange}/>
        </div>
        <div>
          <div>Project</div>
          <input name="project" value={data.project} onChange={onChange}/>
        </div>
        <div>
          <div>Payment Terms</div>
          <input name="payment_terms" value={data.payment_terms} onChange={onChange}/>
        </div>
        <div>
          <div>Location</div>
          <input name="location" value={data.location} onChange={onChange}/>
        </div>
        <div>
          <div>Discount</div>
          <input name="discount" value={data.discount} onChange={onChange}/>
        </div>
        <hr />

        {
          data.items.map(item=>(
            <CreateInline key={item.key} item={item} remove={removeItem} itemChange={itemChange} />
          ))
        }

        <Button style={{display: "block"}} onClick={addItem}>Add Item</Button>

        <Button type="submit">Save Quotation</Button>
      </form>
    </Container>
  )
}

export default Create

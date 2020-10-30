import React, { useState, useContext, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom"

import ProductService from "../../api/Product"
import QuotationService from "../../api/Quotation"
import { sortByLineNumber } from "../../utils"

import EditInline from "./EditInline"

import { v4 as uuidv4 } from 'uuid';
// import Container from 'react-bootstrap/Container'
import { Container } from "../../styles/Containers"
import styled from "styled-components"

const Button = styled.div`
  border: 1px solid blue;
  &:hover {
    cursor: pointer;
  }
`

const QuotationItemHeader = () => {
  return (
    <div style={{display: "flex"}}>
      <div style={{width: "20px"}}>#</div>
      <div style={{width: "200px"}}>Tag</div>
      <div style={{flex: 1}}>Model</div>
      <div style={{flex: 2}}>Description</div>
      <div style={{width: "80px"}}>Qty</div>
      <div style={{width: "80px"}}>Sell Price</div>
      <div style={{width: "80px"}}>Total Price</div>
      <div style={{width: "80px"}}>Actions</div>
    </div>
  )
}

function Edit() {

  let service = new QuotationService()
  const { id } = useParams()
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
      tagging: `FCU/ACCU-${tempData.items.length + 1}`,
      product: 0,
      model_name: "",
      description: "",
      quantity: 0,
      sell_price: 10
    })
    setData(tempData)
  }

  const removeItem = key => {
    let tempData = JSON.parse(JSON.stringify(data))
    tempData.items = tempData.items.filter(item => item.key !== key)
    setData(tempData)
  }

  const itemChange = newData => {
    let tempData = JSON.parse(JSON.stringify(data))
    tempData.items[newData.idx].line_number = newData.line_number ? newData.line_number : tempData.items[newData.idx].line_number
    tempData.items[newData.idx].tagging = newData.tagging ? newData.tagging : tempData.items[newData.idx].tagging
    tempData.items[newData.idx].product = newData.product ? parseFloat(newData.product) : tempData.items[newData.idx].product
    tempData.items[newData.idx].model_name = newData.model_name ? newData.model_name : tempData.items[newData.idx].model_name
    tempData.items[newData.idx].description = newData.description ? newData.description : tempData.items[newData.idx].description
    tempData.items[newData.idx].quantity = newData.quantity ? newData.quantity : tempData.items[newData.idx].quantity
    tempData.items[newData.idx].sell_price = newData.sell_price ? parseFloat(newData.sell_price) : tempData.items[newData.idx].sell_price
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
    service.update(newData)
    .then(res=>{
      history.push(`/quotation/${id}`)
    })
  }

  useEffect(()=>{
    service.get(id)
    .then(res=>{
      res.data.items.sort(sortByLineNumber)
      setData(res.data)
    })
  }, [])

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

        <QuotationItemHeader />

        {
          data.items.map((item, idx)=>{
            item.line_number = idx
            if (!item.key) {
              item.key = uuidv4()
            }
            return (
              <EditInline key={item.key} item={item} remove={removeItem} itemChange={itemChange} />
            )
          })
        }

        <Button style={{display: "block"}} onClick={addItem}>Add Item</Button>

        <button>Update Quotation</button>
      </form>
    </Container>
  )
}

export default Edit

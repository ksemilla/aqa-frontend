import React, { useState } from 'react'
import { useHistory } from "react-router-dom"

import ProductService from "../../api/Product"

import { Container } from "../../styles/Containers"
import {Input} from "../../styles/elements/Input"
import {TextArea} from "../../styles/elements/TextArea"
import {Primary} from "../../styles/elements/Button"

function Create() {

  const history = useHistory()
  const [data, setData] = useState({
    model_name: "",
    description: "",
    sell_price: 0,
    cost_price: 0,
    stock_qty: 0,
    capacity: ""
  })

  const onSubmit = e => {
    e.preventDefault()
    let newData = {
      ...data,
      sell_price: data.sell_price * 100,
      cost_price: data.cost_price * 100,
      stock_qty: data.stock_qty * 100
    }
    let api = new ProductService()
    api.create(newData)
    .then(res=>{
      console.log(res)
      history.push("/products")
    })
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
    <Container style={{maxWidth: "600px"}}>
      <div style={{textAlign: "center", fontSize: "2rem", fontWeight: "bold"}}>Creating New Product</div>
      <form onSubmit={onSubmit}> 
        <div style={{display: "flex", alignItems: "center", marginBottom: "0.5rem"}}>
          <div style={{width: "100px"}}>Model</div>
          <div style={{flex: 1}}>
            <Input name="model_name" value={data.model_name} onChange={onChange}/>
          </div>
        </div>
        <div style={{display: "flex", alignItems: "top"}}>
          <div style={{width: "100px"}}>Description</div>
          <div style={{flex: 1}}>
            <TextArea name="description" value={data.description} onChange={onChange}/>
          </div>
        </div>
        <div style={{display: "flex", alignItems: "center", marginBottom: "0.5rem"}}>
          <div style={{width: "100px"}}>Sell Price</div>
          <div style={{flex: 1}}>
            <Input name="sell_price" value={data.sell_price} onChange={onChange}/>
          </div>
        </div>
        <div style={{display: "flex", alignItems: "center", marginBottom: "0.5rem"}}>
          <div style={{width: "100px"}}>Cost Price</div>
          <div style={{flex: 1}}>
            <Input name="cost_price" value={data.cost_price} onChange={onChange}/>
          </div>
        </div>
        <div style={{display: "flex", alignItems: "center", marginBottom: "0.5rem"}}>
          <div style={{width: "100px"}}>Stock Qty</div>
          <div style={{flex: 1}}>
            <Input name="stock_qty" value={data.stock_qty} onChange={onChange}/>
          </div>
        </div>
        <div style={{display: "flex", alignItems: "center", marginBottom: "0.5rem"}}>
          <div style={{width: "100px"}}>Capacity</div>
          <div style={{flex: 1}}>
            <Input name="capacity" value={data.capacity} onChange={onChange}/>
          </div>
        </div>
        <Primary type="submit" onClick={onSubmit}>Add</Primary>
      </form>
    </Container>
  )
}

export default Create

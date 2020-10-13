import React, { useState } from 'react'
import { useHistory } from "react-router-dom"

import ProductService from "../../api/Product"

import styled from "styled-components"
import { ProductCreate } from '..'

const Button = styled.button`
  &:hover {
    cursor: pointer;
  }
`

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
    <div>
      <div>Creating new Product</div>
      <form onSubmit={onSubmit}> 
        <div>
          <div>Model  Name</div>
          <input name="model_name" value={data.model_name} onChange={onChange}/>
        </div>
        <div>
          <div>Description</div>
          <textarea name="description" value={data.description} onChange={onChange}/>
        </div>
        <div>
          <div>Sell Price</div>
          <input name="sell_price" type="number" step="0.01" min="0" value={data.sell_price} onChange={onChange}/>
        </div>
        <div>
          <div>Cost Price</div>
          <input name="cost_price" type="number" step="0.01" min="0" value={data.cost_price} onChange={onChange}/>
        </div>
        <div>
          <div>Stock Qty</div>
          <input name="stock_qty" type="number" step="0.01" value={data.stock_qty} onChange={onChange}/>
        </div>
        <div>
          <div>Capacity</div>
          <input name="capacity" value={data.capacity} onChange={onChange}/>
        </div>
        <Button type="submit">Add</Button>
      </form>
    </div>
  )
}

export default Create

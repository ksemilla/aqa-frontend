import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom"

import ProductService from "../../api/Product"

import Container from 'react-bootstrap/Container'
import styled from "styled-components"

function Edit() {

  const { id } = useParams()
  const history = useHistory()
  const [product, setProduct] = useState(null)

  const onChange = e => {
    let value = e.target.value
    if (e.target.name === "sell_price" || e.target.name === "cost_price" || e.target.name === "stock_qty") {
      value = parseFloat(e.target.value)
    }
    setProduct({
      ...product,
      [e.target.name]: value
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    let newData = {
      ...product,
      sell_price: product.sell_price * 100,
      cost_price: product.cost_price * 100,
      stock_qty: product.stock_qty * 100,
      id
    }
    let api = new ProductService()
    api.update(newData)
    .then(res=>{
      console.log(res)
      history.push(`/product/${id}`)
    })
  }

  useEffect(()=>{
    let service = new ProductService()
    service.get(id)
    .then(res=>{
      setProduct({
        ...res.data,
        sell_price: res.data.sell_price / 100,
        cost_price: res.data.cost_price / 100,
        stock_qty: res.data.stock_qty / 100,
      })
    })
  }, [])

  return (
    product && 
    <Container>
      <div>Editing</div>
      <form onSubmit={onSubmit}>
        <div>
          <div>Model  Name</div>
          <input name="model_name" value={product.model_name} onChange={onChange}/>
        </div>
        <div>
          <div>Description</div>
          <textarea name="description" value={product.description} onChange={onChange}/>
        </div>
        <div>
          <div>Sell Price</div>
          <input name="sell_price" type="number" step="0.01" min="0" value={product.sell_price} onChange={onChange}/>
        </div>
        <div>
          <div>Cost Price</div>
          <input name="cost_price" type="number" step="0.01" min="0" value={product.cost_price} onChange={onChange}/>
        </div>
        <div>
          <div>Stock Qty</div>
          <input name="stock_qty" type="number" step="0.01" value={product.stock_qty} onChange={onChange}/>
        </div>
        <div>
          <div>Capacity</div>
          <input name="capacity" value={product.capacity} onChange={onChange}/>
        </div>
        <button type="submit">Edit</button>
      </form>
    </Container>
  )
}

export default Edit

import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom"

import ProductService from "../../api/Product"

import { Container } from "../../styles/Containers"
import {Input} from "../../styles/elements/Input"
import {TextArea} from "../../styles/elements/TextArea"
import {Primary} from "../../styles/elements/Button"

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
  }, [id])

  return (
    product && 
    <Container style={{maxWidth: "600px"}}>
      <div style={{textAlign: "center", fontSize: "2rem", fontWeight: "bold"}}>Product # {id}</div>
      <form onSubmit={onSubmit}> 
        <div style={{display: "flex", alignItems: "center", marginBottom: "0.5rem"}}>
          <div style={{width: "100px"}}>Model</div>
          <div style={{flex: 1}}>
            <Input name="model_name" value={product.model_name} onChange={onChange}/>
          </div>
        </div>
        <div style={{display: "flex", alignItems: "top"}}>
          <div style={{width: "100px"}}>Description</div>
          <div style={{flex: 1}}>
            <TextArea name="description" value={product.description} onChange={onChange}/>
          </div>
        </div>
        <div style={{display: "flex", alignItems: "center", marginBottom: "0.5rem"}}>
          <div style={{width: "100px"}}>Sell Price</div>
          <div style={{flex: 1}}>
            <Input name="sell_price" value={product.sell_price} onChange={onChange}/>
          </div>
        </div>
        <div style={{display: "flex", alignItems: "center", marginBottom: "0.5rem"}}>
          <div style={{width: "100px"}}>Cost Price</div>
          <div style={{flex: 1}}>
            <Input name="cost_price" value={product.cost_price} onChange={onChange}/>
          </div>
        </div>
        <div style={{display: "flex", alignItems: "center", marginBottom: "0.5rem"}}>
          <div style={{width: "100px"}}>Stock Qty</div>
          <div style={{flex: 1}}>
            <Input name="stock_qty" value={product.stock_qty} onChange={onChange}/>
          </div>
        </div>
        <div style={{display: "flex", alignItems: "center", marginBottom: "0.5rem"}}>
          <div style={{width: "100px"}}>Capacity</div>
          <div style={{flex: 1}}>
            <Input name="capacity" value={product.capacity} onChange={onChange}/>
          </div>
        </div>
        <Primary type="submit" onClick={onSubmit}>Update</Primary>
      </form>
    </Container>
  )
}

export default Edit

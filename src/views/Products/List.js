import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"

import {Container} from '../../styles/Containers'

import ProductService from "../../api/Product"
import Inline from "./Inline"

import styled from "styled-components"

const Add = styled.span`
  padding: 1rem;
  color: #186bc4;
  &:hover {
    cursor: pointer;
    color: #11549c;
  }
`

const ListWrapper = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 1.2rem;
`

const Item = styled.span`
  padding: 0.5rem;
  flex: 1;
`

const Paginator = styled.div`
  font-size: 1.3rem;
  &:hover {
    cursor: pointer;
    color: blue;
  }
`

function List() {

  const [products, setProducts] = useState([])
  const history = useHistory()
  const [next, setNext] = useState(null)
  const [prev, setPrev] = useState(null)
  const [count, setCount] = useState(0)

  useEffect(()=>{
    let api = new ProductService()
    api.getAll()
    .then(res=>{
      if (res.data.results.length > 0) {
        setProducts(res.data.results)
        setNext(res.data.next)
        setPrev(res.data.previous)
        setCount(res.data.count)
      }
    })
  }, [])

  return (
    <Container>
      <div style={{display: "flex", alignItems: "center", fontSize: "2rem"}}>
        <div>Products</div>
        <Add onClick={()=>history.push(`/products/create`)}><i className="fa fa-plus" aria-hidden="true"></i></Add>
      </div>
      <ListWrapper>
        <Item>Model</Item>
        <Item>Description</Item>
        <Item>Sell Price</Item>
        <Item>Cost Price</Item>
        <Item>Stocks</Item>
        <Item>Capacity</Item>
      </ListWrapper>
      {
        products.map((product, idx)=>(
          <Inline key={idx} product={product} bgColor={idx % 2 === 0 ? "#EEE" : ""}/>
        ))
      }
      <div style={{display: "flex", justifyContent: "center"}}>
        <Paginator onClick={()=>{
          let api = new ProductService()
          api.getNextList(prev)
          .then(res=>{
            if (res.data.results.length > 0) {
              setProducts(res.data.results)
              setNext(res.data.next)
              setPrev(res.data.previous)
              setCount(res.data.count)
            }
          }) 
        }}>{prev ? <i className="fa fa-angle-double-left" aria-hidden="true"></i> : null}</Paginator>
        <div style={{marginLeft: "1.5rem", marginRight: "1.5rem", color: "black", fontSize: "1.3rem"}}>{prev ? prev[prev.length - 1] === "/" ? Math.ceil(count / 20) : prev[prev.length - 1] : 1}</div>
        <Paginator onClick={()=>{
          let api = new ProductService()
          api.getNextList(next)
          .then(res=>{
            if (res.data.results.length > 0) {
              setProducts(res.data.results)
              setNext(res.data.next)
              setPrev(res.data.previous)
              setCount(res.data.count)
            }
          }) 
        }}>{next ? <i className="fa fa-angle-double-right" aria-hidden="true"></i> : null}</Paginator>
      </div>  
    </Container>
  )
}

export default List

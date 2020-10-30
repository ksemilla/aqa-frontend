import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Container from 'react-bootstrap/Container'

import ProductService from "../../api/Product"
import Inline from "./Inline"

import styled from "styled-components"

const Add = styled.span`
  padding: 1rem;
  color: blue;
  &:hover {
    cursor: pointer;
    background-color: #EEE;
  }
`

const ListWrapper = styled.div`
  display: flex;
`

const Item = styled.span`
  padding: 0.5rem;
  vertical-align: center;
  width: ${props => props.width};
  flex: ${props => props.flex};
`

function List() {

  const [products, setProducts] = useState([])
  const history = useHistory()

  useEffect(()=>{
    let api = new ProductService()
    api.getAll()
    .then(res=>{
      if (res.data.results.length > 0) {
        setProducts(res.data.results)
      }
    })
  }, [])

  return (
    <Container>
      <div style={{padding: "1rem 0rem"}}>
        <span>Products - </span>
        <Add onClick={()=>history.push(`/products/create`)}>Add new</Add>
      </div>
      <ListWrapper>
        <Item width={`200px`}>Model</Item>
        <Item width={`300px`}>Description</Item>
        <Item width={`200px`}>Sell Price</Item>
        <Item width={`200px`}>Cost Price</Item>
        <Item width={`200px`}>Stocks</Item>
        <Item width={`200px`}>Capacity</Item>
      </ListWrapper>
      {
        products.map((product, idx)=>(
          <Inline key={idx} product={product} bgColor={idx % 2 === 0 ? "#EEE" : ""}/>
        ))
      }
    </Container>
  )
}

export default List

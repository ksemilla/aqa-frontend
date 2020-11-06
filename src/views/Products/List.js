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
`

const Item = styled.span`
  padding: 0.5rem;
  flex: 1;
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
      <div style={{display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem"}}>
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
    </Container>
  )
}

export default List

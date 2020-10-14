import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Container from 'react-bootstrap/Container'

import ProductService from "../../api/Product"
import Inline from "./Inline"

import styled from "styled-components"

const Add = styled.span`
  color: blue;
  &:hover {
    cursor: pointer;
  }
`

function List() {

  const [products, setProducts] = useState([])
  const history = useHistory()

  useEffect(()=>{
    let api = new ProductService()
    api.getAll()
    .then(res=>{
      if (res.data.length > 0) {
        setProducts(res.data)
      }
    })
  }, [])

  return (
    <Container fluid>
      <div>
        <span>Products - </span>
        <Add onClick={()=>history.push(`/products/create`)}>Add new</Add>
      </div>
      {
        products.map((product, idx)=>(
          <Inline key={idx} product={product} bgColor={idx % 2 === 0 ? "#EEE" : ""}/>
        ))
      }
    </Container>
  )
}

export default List

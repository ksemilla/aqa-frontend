import React from 'react'
import { useHistory } from "react-router-dom"

import styled from "styled-components"

const ListWrapper = styled.div`
  background-color: ${props=>props.bgColor};
  display: flex;
  &:hover {
    cursor: pointer;
    background-color: #DDD;
  }
`

const Item = styled.span`
  padding: 0.5rem;
  flex: 1;
`

function Inline({ product, bgColor }) {
  const history = useHistory()
  return (
    <ListWrapper bgColor={bgColor} onClick={()=>history.push(`/product/${product.id}`)}>
      <Item>{product.model_name}</Item>
      <Item>{product.description}</Item>
      <Item>{product.sell_price / 100}</Item>
      <Item>{product.cost_price / 100}</Item>
      <Item>{product.stock_qty / 100}</Item>
      <Item>{product.capacity}</Item>
    </ListWrapper>
  )
}

export default Inline

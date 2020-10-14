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
  vertical-align: center;
  width: ${props => props.width};
  flex: ${props => props.flex};
`

function Inline({ quotation, bgColor }) {
  const history = useHistory()
  return (
    <ListWrapper bgColor={bgColor} onClick={()=>history.push(`/quotation/${quotation.id}`)}>
      <Item width={`200px`}>{quotation.model_name}</Item>
      <Item width={`300px`}>{quotation.description}</Item>
      <Item width={`200px`}>{quotation.sell_price / 100}</Item>
      <Item width={`200px`}>{quotation.cost_price / 100}</Item>
      <Item width={`200px`}>{quotation.stock_qty / 100}</Item>
      <Item width={`200px`}>{quotation.capacity}</Item>
    </ListWrapper>
  )
}

export default Inline

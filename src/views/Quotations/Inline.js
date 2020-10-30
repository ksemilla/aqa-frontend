import React from 'react'
import { useHistory } from "react-router-dom"
import moment from "moment"

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
      <Item width={`200px`}>{quotation.id}</Item>
      <Item width={`300px`}>{quotation.company_name}</Item>
      <Item width={`200px`}>{quotation.author_detail.email}</Item>
      <Item width={`200px`}>{quotation.total_price * (100 - quotation.discount) / 100}</Item>
      <Item width={`200px`}>{moment(quotation.expiry_date).format("MMM DD, YYYY")}</Item>
    </ListWrapper>
  )
}

export default Inline

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

const Item = styled.div`
  padding: 0.5rem;
  flex: 1;
`

function Inline({ quotation, bgColor }) {
  const history = useHistory()
  return (
    <ListWrapper bgColor={bgColor} onClick={()=>history.push(`/quotation/${quotation.id}`)}>
      <Item >{quotation.id}</Item>
      <Item >{quotation.company_name}</Item>
      <Item >{quotation.author_detail.email.split("@")[0]}</Item>
      <Item >{quotation.total_price * (100 - quotation.discount) / 100}</Item>
      <Item >{moment(quotation.expiry_date).format("MMM DD, YYYY")}</Item>
    </ListWrapper>
  )
}

export default Inline

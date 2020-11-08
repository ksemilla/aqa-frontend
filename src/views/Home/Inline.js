import React from 'react'
import { useHistory } from "react-router-dom"
import moment from "moment"

import styled from "styled-components"

const ListWrapper = styled.div`
  background-color: ${props=>props.bgColor};
  display: flex;
  padding: 0.5rem;
  &:hover {
    cursor: pointer;
    background-color: #DDD;
  }
`

function Inline({ quotation, bgColor }) {
  const history = useHistory()
  return (
    <ListWrapper bgColor={bgColor} onClick={()=>history.push(`/quotation/${quotation.id}`)}>
      <div style={{flex: 1}}>{quotation.id}</div>
      <div style={{flex: 1}}>{quotation.company_name}</div>
      <div style={{flex: 1}}>{quotation.se_detail.email}</div>
      <div style={{flex: 1}}>{moment(quotation.expiry_date).format("MMM DD, YYY")}</div>
      <div style={{flex: 1}}>{moment(quotation.expiry_date).diff(moment(), "days")}</div>
    </ListWrapper>
  )
}

export default Inline

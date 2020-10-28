import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Container from 'react-bootstrap/Container'

import QuotationService from "../../api/Quotation"
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

  const [quotations, setQuotations] = useState([])
  const history = useHistory()

  useEffect(()=>{
    let api = new QuotationService()
    api.getAll()
    .then(res=>{
      if (res.data.length > 0) {
        setQuotations(res.data)
      }
    })
  }, [])

  return (
    <Container>
      <div style={{padding: "1rem 0rem"}}>
        <span>Quotations - </span>
        <Add onClick={()=>history.push(`/quotations/create`)}>Add new</Add>
      </div>
      <ListWrapper>
        <Item width={`200px`}>ID</Item>
        <Item width={`300px`}>Customer</Item>
      </ListWrapper>
      {
        quotations.map((quotation, idx)=>(
          <Inline key={idx} quotation={quotation} bgColor={idx % 2 === 0 ? "#EEE" : ""}/>
        ))
      }
    </Container>
  )
}

export default List

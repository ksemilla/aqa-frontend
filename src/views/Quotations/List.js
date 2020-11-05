import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import {Container} from '../../styles/Containers'

import QuotationService from "../../api/Quotation"
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

const Item = styled.div`
  padding: 0.5rem;
  flex: 1;
`

function List() {

  const [quotations, setQuotations] = useState([])
  const [next, setNext] = useState(null)
  const [prev, setPrev] = useState(null) 
  const history = useHistory()

  useEffect(()=>{
    let api = new QuotationService()
    api.getAll()
    .then(res=>{
      if (res.data.results.length > 0) {
        setQuotations(res.data.results)
        setNext(res.data.next)
        setPrev(res.data.previous)
      }
      
    })
  }, [])

  return (
    <Container>
      <div style={{display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem"}}>
        <div>Quotations</div>
        <Add onClick={()=>history.push(`/quotations/create`)}><i className="fa fa-plus" aria-hidden="true"></i></Add>
      </div>
      <ListWrapper style={{fontSize: "1.1rem", fontWeight: "bold"}}>
        <Item>ID</Item>
        <Item>Customer</Item>
        <Item>App. Engr</Item>
        <Item>Disc. Price</Item>
        <Item>Expiry</Item>
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

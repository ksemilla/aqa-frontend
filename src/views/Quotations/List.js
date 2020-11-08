import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import {Container} from '../../styles/Containers'

import QuotationService from "../../api/Quotation"
import Inline from "./Inline"
import { CursorPointer } from "../../styles/elements/CursorPointer"

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

const Paginator = styled.div`
  font-size: 1.3rem;
  &:hover {
    cursor: pointer;
    color: blue;
  }
`

function List() {

  const [quotations, setQuotations] = useState(null)
  const [next, setNext] = useState(null)
  const [prev, setPrev] = useState(null)
  const [count, setCount] = useState(0)
  const history = useHistory()

  useEffect(()=>{
    let api = new QuotationService()
    api.getAll()
    .then(res=>{
      if (res.data.results.length > 0) {
        setQuotations(res.data.results)
        setNext(res.data.next)
        setPrev(res.data.previous)
        setCount(res.data.count)
      }
    })
  }, [])

  return (
    quotations && 
    <Container>
      <div style={{display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem"}}>
        <CursorPointer>Quotations</CursorPointer>
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
      <div style={{display: "flex", justifyContent: "center"}}>
        <Paginator onClick={()=>{
          let api = new QuotationService()
          api.getNextList(prev)
          .then(res=>{
            if (res.data.results.length > 0) {
              setQuotations(res.data.results)
              setNext(res.data.next)
              setPrev(res.data.previous)
              setCount(res.data.count)
            }
          }) 
        }}>{prev ? <i className="fa fa-angle-double-left" aria-hidden="true"></i> : null}</Paginator>
        <div style={{marginLeft: "1.5rem", marginRight: "1.5rem", color: "black", fontSize: "1.3rem"}}>{prev ? prev[prev.length - 1] === "/" ? Math.ceil(count / 20) : prev[prev.length - 1] : 1}</div>
        <Paginator onClick={()=>{
          let api = new QuotationService()
          api.getNextList(next)
          .then(res=>{
            if (res.data.results.length > 0) {
              setQuotations(res.data.results)
              setNext(res.data.next)
              setPrev(res.data.previous)
              setCount(res.data.count)
            }
          }) 
        }}>{next ? <i className="fa fa-angle-double-right" aria-hidden="true"></i> : null}</Paginator>
      </div>  
    </Container>
  )
}

export default List

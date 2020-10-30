import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom"

import QuotationService from "../../api/Quotation"
import { sortByLineNumber } from "../../utils"

import Modal from 'react-bootstrap/Modal'
import { Container } from "../../styles/Containers"
import styled from "styled-components"

const Button = styled.button({

})


function Detail() {

  const [quotation, setQuotation] = useState(null)
  const service = new QuotationService()
  const { id } = useParams()
  const [alert, setAlert] = useState(false)
  const history = useHistory()

  const remove = () => {
    console.log("DELETE QUOTATION")
  }

  useEffect(()=>{
    service.get(id)
    .then(res=>{
      res.data.items.sort(sortByLineNumber)
      setQuotation(res.data)
    })
  }, [service, id])

  return (
    quotation && 
    <Container style={{padding: "0.2rem"}}>
      <div>Company: {quotation.company_name}</div>
      <div>Subject: {quotation.subject}</div>
      <div>Description: {quotation.sub_subject}</div>
      <div>Total Price: {quotation.total_price}</div>
      <div>Discount: {quotation.discount}</div>
      <div>Total Discounted Price: <span style={{fontWeight: "bold"}}>{quotation.total_price * (100 - quotation.discount) / 100}</span></div>
      <hr />
      {
        quotation.items.map(item=>(
          <div key={item.id} style={{display: "flex"}}>
            <div>{item.line_number + 1}</div>
            <div>{item.tagging}</div>
            <div>{item.model_name}</div>
          </div>
        ))
      }

      <Button onClick={()=>history.push(`/quotation/${id}/edit`)}>Edit</Button>
      <Button onClick={()=>setAlert(true)}>Delete</Button>

      <Modal
        animation={false} 
        size="sm"
        show={alert}
        onHide={() => setAlert(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Delete this Quotation?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{quotation.id}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>{
            remove()
            setAlert(false)
            history.push(`/quotations`)
          }} >Delete</Button>
          <Button onClick={()=>setAlert(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>

    </Container>
  )
}

export default Detail

import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from "react-router-dom"

import {StoreContext} from "../../store"
import QuotationService from "../../api/Quotation"
import { sortByLineNumber } from "../../utils"
import DetailInline from "./DetailInline"

import Modal from 'react-bootstrap/Modal'
import moment from "moment"
import styled from "styled-components"

import { Container } from "../../styles/Containers"

const Edit = styled.div`
  display: inline-block;
  padding: 0.2rem 1rem;
  color: white;
  border-radius: 5px;
  background-color: #186bc4;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background-color: #11549c;
  }
`

const Delete = styled.div`
  display: inline-block;
  padding: 0.2rem 1rem;
  color: white;
  border-radius: 5px;
  background-color: #d63e4d;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background-color: #a62834;
  }
`


function Detail() {

  const [quotation, setQuotation] = useState(null)
  const store = useContext(StoreContext)
  const { id } = useParams()
  const [alert, setAlert] = useState(false)
  const [isAllowed, setIsAllowed] = useState(false)
  const history = useHistory()

  const remove = () => {
    let service = new QuotationService()
    service.delete(id)
    .then(res=>{
      history.push(`/quotations`)
    })
  }

  useEffect(()=>{
    let service = new QuotationService()
    service.get(id)
    .then(res=>{
      res.data.items.sort(sortByLineNumber)
      setQuotation(res.data)
      if (quotation) {
        if (store.user.scope === "ae") {
          setIsAllowed(store.user.id === quotation.ae_detail.id)
        } else if (store.user.scope === "se") {
          setIsAllowed(store.user.id === quotation.se_detail.id)
        } else if (store.user.scope === "sl") {
          setIsAllowed(store.user.id === quotation.sl_detail.id)
        }
      }
      
    })
  }, [id, quotation, store.user.scope, store.user.id])

  return (
    quotation && 
    <Container style={{padding: "0.2rem"}}>
      <div style={{fontWeight: "bold", fontSize: "2.5rem", color: "#285ac7"}}>
        AQA
      </div>
      <div style={{fontSize: "1.3rem"}}>

        <div style={{display: "flex"}}>
          <div style={{display: "flex", flex: 1}}>
            <div style={{width: "120px"}}>Company: </div>
            <b>{quotation.company_name}</b>
          </div>
          <div style={{display: "flex", flex: 1}}>
            <div style={{width: "120px"}}>Ref #: </div>
            <b>{quotation.id}</b>
          </div>
          <div style={{display: "flex", flex: 1}}>
            <div style={{width: "120px"}}>Created On: </div>
            <b>{moment(quotation.created_date).format("MMM DD, YYYY")}</b>
          </div>
        </div>

        <div style={{display: "flex"}}>
          <div style={{display: "flex", flex: 1}}>
            <div style={{width: "120px"}}>Subject: </div>
            <b>{quotation.subject}</b>
          </div>
          <div style={{display: "flex", flex: 1}}>
            <div style={{width: "120px"}}>Project: </div>
            <b>{quotation.project}</b>
          </div>
          <div style={{display: "flex", flex: 1}}>
            <div style={{width: "120px"}}>Valid Until: </div>
            <b>{moment(quotation.expiry_date).format("MMM DD, YYYY")}</b>
          </div>
        </div>

        <div style={{display: "flex"}}>
          <div style={{display: "flex", flex: 1}}>
            <div style={{width: "120px"}}></div>
            <i>{quotation.sub_subject}</i>
          </div>
          <div style={{display: "flex", flex: 1}}>
            <div style={{width: "120px"}}>Terms: </div>
            <b>{quotation.payment_terms}</b>
          </div>
          <div style={{display: "flex", flex: 1}}>
            <div style={{width: "120px"}}>Discount: </div>
            <b>{quotation.discount} %</b>
          </div>
        </div>

        <div style={{display: "flex"}}>
          <div style={{display: "flex", flex: 1}}>
            <div style={{width: "120px"}}>Location:</div>
            <b>{quotation.location}</b>
          </div>
          <div style={{display: "flex", flex: 1}}>
            <div style={{width: "120px"}}>Total Price: </div>
            <b>{quotation.total_price}</b>
          </div>
          <div style={{display: "flex", flex: 1}}>
            <div style={{width: "120px"}}>Disc. Price: </div>
            <b>{quotation.total_price * (100 - quotation.discount) / 100}</b>
          </div>
        </div>

        <div style={{display: "flex"}}>
          <div style={{display: "flex", flex: 1}}>
            <div style={{width: "120px"}}>App. Engr:</div>
            <b>{quotation.ae_detail.email}</b>
          </div>
          <div style={{display: "flex", flex: 1}}>
            <div style={{width: "120px"}}>Sales Engr:</div>
            <b>{quotation.se_detail.email}</b>
          </div>
          <div style={{display: "flex", flex: 1}}>
            <div style={{width: "120px"}}>Sales Lead:</div>
            <b>{quotation.sl_detail.email}</b>
          </div>
        </div>

      </div>
      <hr />

      <div style={{display: "flex", fontSize: "1.2rem", fontWeight: 500}}>
        <div style={{width: "20px"}}>#</div>
        <div style={{flex: 1}}>Tagging</div>
        <div style={{flex: 1}}>Model</div>
        <div style={{flex: 1}}>Description</div>
        <div style={{flex: 1}}>Quantity</div>
        <div style={{flex: 1}}>Sell Price</div>
        <div style={{flex: 1}}>Total</div>
      </div>  


      {
        quotation.items.map(item=>(
          <DetailInline key={item.id} item={item} />
        ))
      }

      <hr />

      {
        isAllowed ?
        <div style={{display: "flex"}}>
          <div style={{display: "flex", justifyContent: "center", flex: 1}}>
            <Edit onClick={()=>history.push(`/quotation/${id}/edit`)}>Edit</Edit>
          </div>
          <div style={{display: "flex", justifyContent: "center", flex: 1}}>
            <Delete onClick={()=>setAlert(true)}>Delete</Delete>
          </div>
        </div>
        : null
      }

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
          <Delete onClick={()=>{
            remove()
            setAlert(false)
          }} >Delete</Delete>
          <Edit onClick={()=>setAlert(false)}>Cancel</Edit>
        </Modal.Footer>
      </Modal>

    </Container>
  )
}

export default Detail

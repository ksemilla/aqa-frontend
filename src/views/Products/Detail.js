import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from "react-router-dom"

import { StoreContext } from "../../store"
import ProductService from "../../api/Product"

import Modal from 'react-bootstrap/Modal'
import {Container} from "../../styles/Containers"
import {Primary, Error} from "../../styles/elements/Button"
import styled from "styled-components"

const Button = styled.button({

})

function Detail() {
  const { id } = useParams()
  const history = useHistory()
  const [product, setProduct] = useState(null)
  const [alert, setAlert] = useState(false)
  const store = useContext(StoreContext)
  
  const remove = () => {
    let service = new ProductService()
    service.delete(id)
    .then(res=>{
      console.log(res)
    })
  }

  useEffect(()=>{
    let service = new ProductService()
    service.get(id)
    .then(res=>{
      setProduct(res.data)
    })
  }, [id])

  return (
    product &&
    <Container style={{maxWidth: "600px"}}>
      <div style={{display: "flex", alignItems: "center", marginBottom: "0.5rem"}}>
        <div style={{width: "100px"}}>Model:</div>
        <div style={{flex: 1, fontWeight: "bold"}}>
          {product.model_name}
        </div>
      </div>
      <div style={{display: "flex", alignItems: "center", marginBottom: "0.5rem"}}>
        <div style={{width: "100px"}}>Description:</div>
        <div style={{flex: 1, fontWeight: "bold"}}>
          {product.description}
        </div>
      </div>
      <div style={{display: "flex", alignItems: "center", marginBottom: "0.5rem"}}>
        <div style={{width: "100px"}}>Sell Price:</div>
        <div style={{flex: 1, fontWeight: "bold"}}>
          {product.sell_price}
        </div>
      </div>
      <div style={{display: "flex", alignItems: "center", marginBottom: "0.5rem"}}>
        <div style={{width: "100px"}}>Cost Price:</div>
        <div style={{flex: 1, fontWeight: "bold"}}>
          {product.cost_price}
        </div>
      </div>
      <div style={{display: "flex", alignItems: "center", marginBottom: "0.5rem"}}>
        <div style={{width: "100px"}}>Stock Qty:</div>
        <div style={{flex: 1, fontWeight: "bold"}}>
          {product.stock_qty}
        </div>
      </div>
      <div style={{display: "flex", alignItems: "center", marginBottom: "0.5rem"}}>
        <div style={{width: "100px"}}>Capacity:</div>
        <div style={{flex: 1}}>
         {product.capacity}
        </div>
      </div>


      {
        store.user.scope === "scm" ?
        <>
          <Primary onClick={()=>history.push(`/product/${id}/edit`)}>Edit</Primary>
          <Error onClick={()=>setAlert(true)}>Delete</Error>
        </>
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
            Delete this Product?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{product.model_name}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>{
            remove()
            setAlert(false)
            history.push(`/products`)
          }} >Delete</Button>
          <Button onClick={()=>setAlert(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Detail

import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom"

import ProductService from "../../api/Product"

import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import styled from "styled-components"

const Button = styled.button({

})

function Detail() {
  const { id } = useParams()
  const history = useHistory()
  const [product, setProduct] = useState(null)
  const [alert, setAlert] = useState(false)
  
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
    <Container>
      <div style={{marginBottom: "1rem"}}>
        <div style={{fontSize: "2rem"}}>{product.model_name}</div>
        <div style={{}}>{`Description: ${product.description}`}</div>
        <div style={{}}>{`Sell Price: ${product.sell_price / 100}`}</div>
        <div style={{}}>{`Cost Price: ${product.cost_price / 100}`}</div>
        <div style={{}}>{`Stock Qty: ${product.stock_qty / 100}`}</div>
        <div style={{}}>{`Capacity: ${product.capacity}`}</div>
      </div>
      <Button onClick={()=>history.push(`/product/${id}/edit`)}>Edit</Button>
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

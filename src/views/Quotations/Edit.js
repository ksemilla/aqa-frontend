import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom"

import QuotationService from "../../api/Quotation"
import CreateInline from "./CreateInline"

import { v4 as uuidv4 } from 'uuid';

import { Input } from "../../styles/elements/Input"
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment from "moment"

import { Container } from "../../styles/Containers"
import styled from "styled-components"

const AddItemButton = styled.div`
  padding: 0.3rem 0.7rem;
  color: white;
  border-radius: 5px;
  background-color: rgba(28, 77, 237,0.9);
  display: inline-block;
  &:hover {
    cursor: pointer;
    background-color: rgba(28, 77, 237, 1);
  }
`

const SubmitButton = styled.div`
  padding: 0.3rem 0.7rem;
  color: white;
  border-radius: 5px;
  background-color: rgba(28, 77, 237,0.9);
  display: inline-block;
  &:hover {
    cursor: pointer;
    background-color: rgba(28, 77, 237, 1);
  }
`

const QuotationItemHeader = () => {
  return (
    <div style={{display: "flex", }}>
      <div style={{width: "20px", padding: "0.2rem"}}>#</div>
      <div style={{flex: 1, padding: "0.2rem"}}>Tag</div>
      <div style={{flex: 1, padding: "0.2rem"}}>Model</div>
      <div style={{flex: 2, padding: "0.2rem"}}>Description</div>
      <div style={{width: "100px", padding: "0.2rem"}}>Qty</div>
      <div style={{width: "100px", padding: "0.2rem"}}>Sell Price</div>
      <div style={{width: "100px", padding: "0.2rem"}}>Total Price</div>
      <div style={{width: "100px", padding: "0.2rem", textAlign: "center"}}>Actions</div>
    </div>
  )
}

function Create() {

  let service = new QuotationService()
  const { id } = useParams()
  const history = useHistory()
  const [data, setData] = useState({
    created_date: "",
    company_name: "",
    subject: "",
    project: "",
    payment_terms: "",
    location: "",
    discount: 0,
    items: [{
      key: uuidv4(),
      line_number: 0,
      tagging: `FCU/ACCU-1`,
      product: 0,
      model_name: "",
      description: "",
      quantity: 0,
      sell_price: 0
    }]
  })

  const addItem = e => {
    e.preventDefault()
    let tempData = JSON.parse(JSON.stringify(data))
    tempData.items.push({
      key: uuidv4(),
      line_number: tempData.items.length,
      tagging: `FCU/ACCU-${tempData.items.length + 1}`,
      product: 0,
      model_name: "",
      description: "",
      quantity: 0,
      sell_price: 0
    })
    setData(tempData)
  }

  const removeItem = key => {
    let tempData = JSON.parse(JSON.stringify(data))
    tempData.items = tempData.items.filter(item => item.key !== key)
    setData(tempData)
  }

  const itemChange = newData => {
    let tempData = JSON.parse(JSON.stringify(data))
    tempData.items[newData.idx].line_number = newData.line_number ? newData.line_number : tempData.items[newData.idx].line_number
    tempData.items[newData.idx].tagging = newData.tagging ? newData.tagging : tempData.items[newData.idx].tagging
    tempData.items[newData.idx].product = newData.product ? parseFloat(newData.product) : tempData.items[newData.idx].product
    tempData.items[newData.idx].model_name = newData.model_name ? newData.model_name : tempData.items[newData.idx].model_name
    tempData.items[newData.idx].description = newData.description ? newData.description : tempData.items[newData.idx].description
    tempData.items[newData.idx].quantity = newData.quantity ? newData.quantity : tempData.items[newData.idx].quantity
    tempData.items[newData.idx].sell_price = newData.sell_price ? parseFloat(newData.sell_price) : tempData.items[newData.idx].sell_price
    setData(tempData)
  }

  const onChange = e => {
    let value = e.target.value
    if (e.target.name === "sell_price" || e.target.name === "cost_price" || e.target.name === "stock_qty") {
      value = parseFloat(e.target.value)
    }
    setData({
      ...data,
      [e.target.name]: value
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    let newData = {
      ...data
    }
    service.update(newData)
    .then(res=>{
      history.push({
        pathname: `/quotation/${res.data.id}`,
        data: res.data
      })
    })
  }

  useEffect(()=>{
    service.get(id)
    .then(res=>{
      setData(res.data)
    })
  }, [])

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <div style={{display: "flex"}}>
          <div style={{flex: 1, display: "flex", alignItems: "center"}}>
            <div style={{fontWeight: "bold", fontSize: "2.5rem", color: "#285ac7"}}>AQA</div>
          </div>
          <div style={{flex: 1, display: "flex", alignItems: "center"}}>
            <div style={{fontWeight: "bold", fontSize: "2rem"}} >
              {/* CENTER PART KEKW */}
            </div>
          </div>
          <div style={{flex: 1}}>
            <div style={{flex: 1, display: "flex", alignItems: "center"}}>
              <div style={{width: "30%"}}>Date Created: </div>
              <DayPickerInput
                value={moment(data.created_date).format("YYYY-MM-DD")}
                dayPickerProps={{
                  showWeekNumbers: true,
                  todayButton: 'Today',
                }}
                onDayChange={(selectedDay, modifiers, dayPickerInput)=>{
                  setData({
                    ...data,
                    created_date: dayPickerInput.getInput().value
                  })
                }}
                style={{
                  width: "100%"
                }}
                inputProps={{
                  style: {
                    width: "100%",
                    border: "1px solid #BBB",
                    borderRadius: "5px",
                    padding: "0.2rem"
                  },
                  disabled: true
                }}
              />
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
              <div style={{width: "30%"}}>Project</div>
              <Input name="project" value={data.project} onChange={onChange}/>
            </div>
          </div>
        </div>
        <div style={{display: "flex", marginTop: "1rem"}}>
          <div style={{flex: 1}}>
            <div style={{display: "flex", alignItems: "center"}}>
              <div style={{width: "30%"}}>Company Name</div>
              <Input name="company_name" value={data.company_name} onChange={onChange}/>
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
              <div style={{width: "30%"}}>Location</div>
              <Input name="location" value={data.location} onChange={onChange}/>
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
              <div style={{width: "30%"}}>Subject</div>
              <Input name="subject" value={data.subject} onChange={onChange}/>
            </div>
          </div>
          <div style={{flex: 1}}>
                {/* CENTER PART KEKW */}
          </div>
          <div style={{flex: 1}}>
            <div style={{display: "flex", alignItems: "center"}}>
              <div style={{width: "30%"}}>Payment Terms</div>
              <Input name="payment_terms" value={data.payment_terms} onChange={onChange}/>
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
              <div style={{width: "30%"}}>Discount</div>
              <Input name="discount" value={data.discount} onChange={onChange}/>
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
              <div style={{}}>Total Discounted Price</div>
            </div>
          </div>
        </div>
        
        
        <hr />

        <QuotationItemHeader />

        {
          data.items.map((item, idx)=>{
            item.line_number = idx
            return (
              <CreateInline key={item.key} item={item} remove={removeItem} itemChange={itemChange} />
            )
          })
        }

        <AddItemButton onClick={addItem}>Add Item</AddItemButton>

        <hr />

        <SubmitButton type="submit" onClick={onSubmit}>Save Quotation</SubmitButton>
      </form>
    </Container>
  )
}

export default Create

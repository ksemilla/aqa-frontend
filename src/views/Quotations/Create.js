import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom"
import { StoreContext } from "../../store"

import QuotationService from "../../api/Quotation"
import UserService from "../../api/User"

import CreateInline from "./CreateInline"

import { v4 as uuidv4 } from 'uuid';

import { Input } from "../../styles/elements/Input"
import 'react-day-picker/lib/style.css';
import moment from "moment"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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

  const store = useContext(StoreContext)
  const user = store.user
  const history = useHistory()
  const [roles, setRoles] = useState({
    ae: [],
    se: [],
    sl: []
  })
  const [data, setData] = useState({
    created_date: moment().toISOString(),
    company_name: "",
    subject: "",
    project: "",
    payment_terms: "",
    location: "",
    discount_rate: 0,
    total_price: 0,
    application_engr: 0,
    ae_detail: null,
    sales_engr: 0,
    se_detail: null,
    sales_lead: 0,
    sl_detail: null,
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
    tempData.items[newData.idx].product = newData.product || newData.product === 0 ? parseFloat(newData.product) : tempData.items[newData.idx].product
    tempData.items[newData.idx].model_name = newData.model_name || newData.model_name === "" ? newData.model_name : tempData.items[newData.idx].model_name
    tempData.items[newData.idx].description = newData.description || newData.description === "" ? newData.description : tempData.items[newData.idx].description
    tempData.items[newData.idx].quantity = newData.quantity || newData.quantity === 0 ? newData.quantity : tempData.items[newData.idx].quantity
    tempData.items[newData.idx].sell_price = newData.sell_price || newData.sell_price === 0 ? parseFloat(newData.sell_price) : tempData.items[newData.idx].sell_price
    tempData.items[newData.idx].h_desc = newData.h_desc || newData.h_desc === 0 ? parseFloat(newData.h_desc) : tempData.items[newData.idx].h_desc
    let total = 0
    tempData.items.forEach(element => {
      total += element.sell_price * element.quantity
    });
    tempData.total_price = total
    setData(tempData)
  }

  const onChange = e => {
    let value = e.target.value
    if (e.target.name === "discount_rate") {
      if (value === "") {
        value = ""
      } else {
        value = parseFloat(value)
      }
    }
    setData({
      ...data,
      [e.target.name]: value
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    let newData = {
      ...data,
      discount_rate: data.discount_rate === "" ? 0 : data.discount_rate
    }
    let service = new QuotationService()
    service.create(newData)
    .then(res=>{
      history.push(`/quotation/${res.data.id}`)
    })
    .catch(res=>{
      console.log(res.response)
    })
  }

  useEffect(()=>{
    setData(data=>({
      ...data,
      ae_detail: user.scope === "ae" ? user : null,
      se_detail: user.scope === "se" ? user : null,
      sl_detail: user.scope === "sl" ? user : null,
    }))
  }, [user])

  useEffect(()=>{
    if (Object.keys(store.roles).length === 0) {
      let service = new UserService()
      service.getRoles()
      .then(res=>{
        store.setRoles(res.data)
        setRoles(res.data)
      })
    } else {
      setRoles(store.roles)
    }
    
  }, [store])

  return (
    <Container style={{padding: "0.5rem"}}>

      <div style={{display: "flex" ,flexWrap: "wrap", alignItems: "center"}}>
        <div style={{flex: 1, fontWeight: "bold", fontSize: "2.5rem", color: "#285ac7"}}></div>
        <div style={{flex: 1, fontSize: "2rem", fontWeight: "bold"}}>Creating New Quotation</div>
        <div style={{flex: 1}}></div>
      </div>

      <hr />

      <form onSubmit={onSubmit}>
        <div style={{display: "flex" ,flexWrap: "wrap", alignItems: "center"}}>
          <div style={{flex: 1, display: "flex", alignItems: "center"}}>
            <div style={{padding: "0.5rem", width: "100px"}}>Company</div>
            <div style={{flex: 1}}>
              <Input name="company_name" value={data.company_name} onChange={onChange}/>
            </div>
          </div>
          <div style={{flex: 1, display: "flex", alignItems: "center"}}>
            <div style={{padding: "0.5rem", width: "100px"}}>Created</div>
            <div style={{flex: 1}}>
              <Input name="created_date" value={moment(data.created_date).format("YYYY-MM-DD")} onChange={onChange} disabled/>
            </div>
          </div>
          <div style={{flex: 1, display: "flex", alignItems: "center"}}>
            <div style={{padding: "0.5rem", width: "100px"}}>Expiry</div>
            <div style={{flex: 1}}>
              <Input name="expiry_date" defaultValue={moment().add(30,'days').format("YYYY-MM-DD")} disabled/>
            </div>
          </div>
        </div>

        <div style={{display: "flex" ,flexWrap: "wrap", alignItems: "center"}}>
          <div style={{flex: 1, display: "flex", alignItems: "center"}}>
            <div style={{padding: "0.5rem", width: "100px"}}>Project</div>
            <div style={{flex: 1}}>
              <Input name="project" value={data.project} onChange={onChange}/>
            </div>
          </div>
          <div style={{flex: 1, display: "flex", alignItems: "center"}}>
            <div style={{padding: "0.5rem", width: "100px"}}>Subject</div>
            <div style={{flex: 1}}>
              <Input name="subject" value={data.subject} onChange={onChange}/>
            </div>
          </div>
          <div style={{flex: 1, display: "flex", alignItems: "center"}}>
            <div style={{padding: "0.5rem", width: "100px"}}>Description</div>
            <div style={{flex: 1}}>
              <Input name="sub_subject" value={data.sub_subject} onChange={onChange}/>
            </div>
          </div>
        </div>

        <div style={{display: "flex" ,flexWrap: "wrap", alignItems: "center"}}>
          <div style={{flex: 1, display: "flex", alignItems: "center"}}>
            <div style={{padding: "0.5rem", width: "100px"}}>Location</div>
            <div style={{flex: 1}}>
              <Input name="location" value={data.location} onChange={onChange}/>
            </div>
          </div>
          <div style={{flex: 1, display: "flex", alignItems: "center"}}>
            <div style={{padding: "0.5rem", width: "100px"}}>Discount</div>
            <div style={{flex: 1}}>
              <Input name="discount_rate" value={data.discount_rate} onChange={onChange} type="number" min={0} step={0.01}/>
            </div>
          </div>
          <div style={{flex: 1, display: "flex", alignItems: "center"}}>
            <div style={{padding: "0.5rem", width: "100px"}}>Total Price</div>
            <div style={{flex: 1}}>
              <Input name="total_price" value={data.total_price} disabled/>
            </div>
          </div>
        </div>

        <div style={{display: "flex" ,flexWrap: "wrap", alignItems: "center"}}>
          <div style={{flex: 1, display: "flex", alignItems: "center"}}>
            <div style={{padding: "0.5rem", width: "100px"}}>Terms</div>
            <div style={{flex: 1}}>
              <Input name="payment_terms" value={data.payment_terms} onChange={onChange}/>
            </div>
          </div>
          <div style={{flex: 1, display: "flex", alignItems: "center"}}>
  
          </div>
          <div style={{flex: 1, display: "flex", alignItems: "center"}}>

          </div>
        </div>


        <div style={{display: "flex" ,flexWrap: "wrap", alignItems: "center"}}>
          <div style={{flex: 1, display: "flex", alignItems: "center"}}>
            <div style={{padding: "0.5rem", width: "100px"}}>App. Engr.</div>
            <div style={{flex: 1}}>
              <Autocomplete
                options={roles.ae}
                getOptionLabel={(option) => option.email}
                clearOnEscape
                blurOnSelect
                renderInput={(params) => <TextField {...params}  />}
                value={data.ae_detail}
                getOptionSelected={(o,v)=> o.email === v.email}
                onChange={(event, value)=>{
                  setData({...data, ae_detail: value, application_engr: value ? value.id : 0})
                }}
              />
            </div>
          </div>
          <div style={{flex: 1, display: "flex", alignItems: "center"}}>
            <div style={{padding: "0.5rem", width: "100px"}}>Sales Engr.</div>
            <div style={{flex: 1}}>
              <Autocomplete
                options={roles.se}
                getOptionLabel={(option) => option.email}
                clearOnEscape
                blurOnSelect
                renderInput={(params) => <TextField {...params}  />}
                value={data.se_detail}
                getOptionSelected={(o,v)=> o.email === v.email}
                onChange={(event, value)=>{
                  setData({...data, se_detail: value, sales_engr: value ? value.id : 0})
                }}
              />
            </div>
          </div>
          <div style={{flex: 1, display: "flex", alignItems: "center"}}>
            <div style={{padding: "0.5rem", width: "100px"}}>Sales Lead</div>
            <div style={{flex: 1}}>
              <Autocomplete
                options={roles.sl}
                getOptionLabel={(option) => option.email}
                clearOnEscape
                blurOnSelect
                renderInput={(params) => <TextField {...params}  />}
                value={data.sl_detail}
                getOptionSelected={(o,v)=> o.email === v.email}
                onChange={(event, value)=>{
                  setData({...data, sl_detail: value, sales_lead: value ? value.id : 0})
                }}
              />
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

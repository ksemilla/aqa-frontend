import React, { useState } from 'react'

import { TextArea } from "../../styles/elements/TextArea"
import { Input } from "../../styles/elements/Input"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import ProductService from "../../api/Product"

import styled from "styled-components"

const Remove = styled.div`
  border: 1px solid;
  border-radius: 5px;
  text-align: center;
  &:hover {
    cursor: pointer;
    color: red;
  }
`

function CreateInline({ item, remove, itemChange }) {

  let service = new ProductService()
  const [options, setOptions] = useState([item])

  return (
    <div style={{display: "flex"}}>
      <div style={{width: "20px"}}>{item.line_number + 1}.</div>
      <div style={{flex: 1, padding: "0.2rem"}}>
        <Input value={item.tagging} onChange={e=>itemChange({
          idx: item.line_number,
          tagging: e.target.value
        })} />
      </div>
      <div style={{flex: 1, padding: "0.2rem"}}>
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.model_name}
          clearOnEscape
          blurOnSelect
          renderInput={(params) => <TextField {...params}  />}
          value={item}
          getOptionSelected={(o,v)=> o.mdoel_name === v.mdoel_name}
          onChange={(event, value)=>{
            value === null || value === "" ? 
            itemChange({ idx: item.line_number,
              product: 0,
              model_name: "",
              description: "",
              sell_price: 0,
              quantity: 0
            })
            :
            itemChange({ idx: item.line_number,
              product: value.id,
              model_name: value.model_name,
              description: value.description,
              sell_price: value.sell_price,
            })
          }}
          onInputChange={(event, value)=>{
            service.query(value)
            .then(res=>{
              setOptions(res.data)
            })
          }}
        />
      </div>
      <div style={{flex: 2, padding: "0.2rem"}}>
        <TextArea value={item.description} style={{width: "100%"}} onChange={e=>{
          itemChange({
            idx: item.line_number,
            description: e.target.value
          })
        }}
        onHeightChange={(height)=>{
          itemChange({ idx: item.line_number,
            h_desc: Math.floor(height / 24)
          })
        }}
        />
      </div>
      <div style={{width: "100px", padding: "0.2rem"}}>
        <Input style={{width: "100%"}} type="number" min={0} value={item.quantity} onChange={e=>{
          itemChange({
            idx: item.line_number,
            quantity: e.target.value
          })
        }}/>
      </div>
      <div style={{width: "100px", padding: "0.2rem"}}>
        {item.sell_price}
      </div>
      <div style={{width: "100px", padding: "0.2rem"}}>{item.quantity * item.sell_price}</div>
      <div style={{width: "100px", padding: "0.2rem"}}>
        <Remove onClick={e=>{
          e.preventDefault()
          remove(item.key)
        }}><i className="fa fa-times" aria-hidden="true"></i></Remove>
      </div>
      
    </div>
  )
}

export default CreateInline
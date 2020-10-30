import React, { useContext, useState } from 'react'

import Autosuggest from 'react-autosuggest';
import TextareaAutosize from 'react-autosize-textarea';

import ProductService from "../../api/Product"

import styled from "styled-components"

const Button = styled.div`
  &:hover {
    cursor: pointer;
  }
`

function EditInline({ item, remove, itemChange }) {

  const service = new ProductService()
  const [suggestions, setSuggestions] = useState([])
  const [choice, setChoices] = useState([])
  const [value, setValue] = useState(item.model_name)

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
   
    return inputLength === 0 ? [] : choice.filter(item =>
      item.model_name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  const getSuggestionValue = suggestion => suggestion.model_name;

  const renderSuggestion = suggestion => (
    <div style={{color: "red", border: "1px solid"}}>
      {suggestion.model_name}
    </div>
  );

  const onChange = (event, { newValue }) => {
    setValue(newValue)
    if (newValue.length > 1) {
      service.query(newValue)
      .then(res=>{
        setChoices(res.data)
        console.log(res.data)
      })
    } else {
      setChoices([])
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value))
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  };

  const inputProps = {
    value,
    onChange: onChange,
    style: {
      width: "100%"
    }
  };

  const getQuery = e => {
    service.query()
  }
  return (
    <div style={{display: "flex"}}>
      <div style={{width: "20px"}}>{item.line_number + 1}.</div>
      <div style={{width: "200px"}}>
        <input style={{width: "100%"}} value={item.tagging} onChange={e=>itemChange({
          idx: item.line_number,
          tagging: e.target.value
        })} />
      </div>
      <div style={{flex: 1}}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={(event, { suggestion })=>{
            console.log(suggestion)
            itemChange({ idx: item.line_number,
              product: suggestion.id,
              model_name: suggestion.model_name,
              description: suggestion.description,
              sell_price: suggestion.sell_price,
            })
          }}
          renderSuggestionsContainer={({ containerProps, children, query })=>{
            return (
              <div style={{position: "absolute", backgroundColor: "white", border: "1px solid blue"}}>
                <div {...containerProps}>
                  {children}
                </div>
              </div>
            )
          }}
        />
      </div>
      <div style={{flex: 2}}>
        <TextareaAutosize value={item.description} style={{width: "100%"}} onChange={e=>{
          itemChange({
            idx: item.line_number,
            description: e.target.value
          })
        }}/>
      </div>
      <div style={{width: "80px"}}>
        <input style={{width: "100%"}} type="number" min={0} value={item.quantity} onChange={e=>{
          itemChange({
            idx: item.line_number,
            quantity: e.target.value
          })
        }}/>
      </div>
      <div style={{width: "80px"}}>
        {item.sell_price}
      </div>
        <div style={{width: "80px"}}>{item.quantity * item.sell_price}</div>
      <div style={{width: "80px"}}>
        <Button onClick={e=>{
          e.preventDefault()
          remove(item.key)
        }}>Remove</Button>
      </div>
      
    </div>
  )
}

export default EditInline
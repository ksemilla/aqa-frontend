import React, { useContext, useState } from 'react'

import Autosuggest from 'react-autosuggest';
import TextareaAutosize from 'react-autosize-textarea';
import { TextArea } from "../../styles/elements/TextArea"
import { Input } from "../../styles/elements/Input"

import ProductService from "../../api/Product"

import styled from "styled-components"

const Button = styled.div`
  &:hover {
    cursor: pointer;
  }
`

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

  const service = new ProductService()
  const [suggestions, setSuggestions] = useState([])
  const [choice, setChoices] = useState([])
  const [value, setValue] = useState(item.model_name)
  const [showList, setShowList] = useState(false)
  const [curr, setCurr] = useState(null)

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
   
    return inputLength === 0 ? [] : choice.filter(item =>
      item.model_name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  const getSuggestionValue = suggestion => suggestion.model_name;

  const renderSuggestion = suggestion => (
    <div style={{borderTop: "1px solid #EEE", borderBottom: "1px solid #EEE", padding: "0.2rem", backgroundColor: suggestion.id === curr ? "#EEE" : ""}}>
      {suggestion.model_name}
    </div>
  );

  const onChange = (event, { newValue }) => {
    setValue(newValue)
    if (newValue.length > 1) {
      service.query(newValue)
      .then(res=>{
        setChoices(res.data)
      })
    } else {
      setChoices([])
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value))
    setShowList(true)
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
    setShowList(false)
  };

  const inputProps = {
    value,
    onChange: onChange,
    style: {
      width: "100%",
      border: "1px solid #BBB",
      borderRadius: "5px",
      padding: "0.2rem"
    }
  };

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
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={(event, { suggestion })=>{
            itemChange({ idx: item.line_number,
              product: suggestion.id,
              model_name: suggestion.model_name,
              description: suggestion.description,
              sell_price: suggestion.sell_price,
            })
          }}
          renderSuggestionsContainer={({ containerProps, children, query })=>{
            return (
              <div style={{position: "relative", height: "0px"}}>
                <div {...containerProps} style={{width: "100%", backgroundColor: "white", border: showList ? "1px solid #CCC" : "none", borderRadius: "5px"}}>
                  {children}
                </div>
              </div>
            )
          }}
          onSuggestionHighlighted={({suggestion})=>{
            setCurr(suggestion ? suggestion.id : null)
          }}
        />
      </div>
      <div style={{flex: 2, padding: "0.2rem"}}>
        <TextArea value={item.description} style={{width: "100%"}} onChange={e=>{
          itemChange({
            idx: item.line_number,
            description: e.target.value
          })
        }}/>
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
        }}><i className="fa fa-times" ariaHidden="true"></i></Remove>
      </div>
      
    </div>
  )
}

export default CreateInline
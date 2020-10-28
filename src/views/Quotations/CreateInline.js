import React, { useContext, useState } from 'react'

import styled from "styled-components"

const Button = styled.button`
  &:hover {
    cursor: pointer;
  }
`

function CreateInline({ item, remove, itemChange }) {

  return (
    <div style={{display: "flex"}}>
      <div>{item.line_number + 1}</div>
      <div>
        <input name="product" value={item.product} onChange={e=>{
          e.preventDefault()
          itemChange({ idx: item.line_number, product: e.target.value })
        }}/>
      </div>
      <Button onClick={e=>{
        e.preventDefault()
        remove(item.key)
      }}>Remove</Button>
    </div>
  )
}

export default CreateInline

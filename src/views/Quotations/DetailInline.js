import React from 'react'

function DetailInline({ item }) {
  return (
    <div style={{display: "flex", fontSize: "1.2rem"}}>
      <div style={{width: "20px"}}>{item.line_number + 1}.</div>
      <div style={{flex: 1}}>{item.tagging}</div>
      <div style={{flex: 1}}>{item.model_name}</div>
      <div style={{flex: 2, whiteSpace: "pre-wrap"}}>{item.description}</div>
      <div style={{flex: 1}}>{item.quantity}</div>
      <div style={{flex: 1}}>{item.sell_price}</div>
      <div style={{flex: 1}}>{item.quantity * item.sell_price}</div>
    </div>
  )
}

export default DetailInline

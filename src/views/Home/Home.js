import React, { useState, useEffect } from 'react'

import {Container} from '../../styles/Containers'

import QuotationService from "../../api/Quotation"
import Inline from "./Inline"

function Home() {

  const [quotations, setQuotations] = useState([])

  useEffect(()=>{
    let api = new QuotationService()
    api.getReminders()
    .then(res=>{
      setQuotations(res.data.results)
    })
    .catch(res=>{
      console.log(res.response)
    })
  }, [])

  return (<Container>
    <div style={{padding: "0.5rem"}}>
      <div style={{display: "flex", fontWeight: "bold", padding: "0.5rem"}}>
        <div style={{flex: 1}}>Ref #</div>
        <div style={{flex: 1}}>Customer</div>
        <div style={{flex: 1}}>Sales Engr</div>
        <div style={{flex: 1}}>Expiry</div>
        <div style={{flex: 1}}>Days Left</div>
      </div>
      {
        quotations.map((item,idx)=>(
          <Inline key={item.id} quotation={item} bgColor={idx % 2 === 0 ? "#EEE" : ""}/>
        ))
      }
    </div>
    
  </Container>)
}

export default Home

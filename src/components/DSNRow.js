import React, { useState, useRef } from "react"
import InputMask from 'react-input-mask'

export default function DSNRow(props) {
  const {
    setEnteredDSN, 
    setExtension,
    commPrefix,
    extension
  } = props
  const [userInput, setUserInput] = useState("")
  const dsnInput = useRef()

  const convertNumber = () => {
    if (userInput !== undefined) {
      const userIn = userInput.split("-")
      const dsn = userIn[0]
      const number = userIn[1]
      setEnteredDSN(dsn.toString())
      setExtension(number.toString())
    }
  }  

  const clearDSN = () => {
    setEnteredDSN()
    setExtension()
    setUserInput("")
  }

  const setInput = () => {
    setUserInput(dsnInput.current.value)
  }

  return (
    <>
      <InputMask 
        ref={dsnInput}  
        className="DSNinput"
        onKeyPress={event => event.key === 'Enter' && convertNumber()} 
        onChange={()=>setInput()}
        mask="999-9999" 
        value={userInput}
        maskChar="_" 
        type="tel"
      />
      <button className="clearBtn" onClick={() => clearDSN()}>&times;</button>
      <div>
        <button className="btn" onClick={() => convertNumber()}>Convert</button>
        {commPrefix && <a className="btn" href={`tel:${commPrefix}-${extension}`}>Dial</a>}
      </div>      
    </>
  );
}

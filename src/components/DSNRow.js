import React, { useRef } from "react"
import InputMask from 'react-input-mask'

export default function DSNRow(props) {
  const {
    setEnteredDSN, 
    setExtension,
    commPrefix,
    extension
  } = props
  const dsnInput = useRef()

  const convertNumber = () => {
    const userInput = dsnInput.current.value.split("-")
    const dsn = userInput[0].toString()
    const number = userInput[1].toString()
    setEnteredDSN(dsn)
    setExtension(number)
  }  

  return (
    <>
      <InputMask 
        ref={dsnInput}  
        className="DSNinput"
        onKeyPress={event => event.key === 'Enter' && convertNumber()} 
        mask="999-9999" 
        maskChar="_" 
        type="tel"
      />
      <div>
        <button className="btn" onClick={() => convertNumber()}>Convert</button>
        {commPrefix && <a className="btn" href={`tel:${commPrefix}-${extension}`}>Dial</a>}
      </div>      
    </>
  );
}

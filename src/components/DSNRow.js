import React, { useRef } from "react";
import InputMask from 'react-input-mask'

export default function DSNRow({ number, setEnteredDSN, setExtension }) {
  const dsnInput = useRef()

  const convertNumber = () => {
    const userInput = dsnInput.current.value.split("-")
    const dsn = userInput[0]
    const number = userInput[1]
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
      />
      <div>
        <button className="btn" onClick={() => convertNumber()}>Convert</button>
      </div>      
    </>
  );
}

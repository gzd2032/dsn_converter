//Main user interface to convert DSNs to Commercial prefixed numbers

import React, { useState, useEffect } from 'react'
import DisplayDetails from './DisplayDetails'
import DSNRow from './DSNRow'

const DSN_API_URL = process.env.REACT_APP_DSN_API_URL + "/prefixes"

export default function MainApp() {
  const [enteredDSN, setEnteredDSN] = useState()
  const [extension, setExtension] = useState()
  const [DSNArray, setDSNArray] = useState({})
  const [errorMsg, setErrorMsg] = useState()
  const [apiMsg, setApiMsg] = useState()

  useEffect(() => {
    const displayNumber = enteredDSN && DSNArray[enteredDSN]

    if (enteredDSN != null && displayNumber == null)
      setErrorMsg("Not a valid DSN Prefix")
    else
      setErrorMsg()
  }, [enteredDSN, DSNArray])

  useEffect(() => { 
    const getDSNs = async () => {

      await fetch(DSN_API_URL)
      .then(res => res.json())
      .then(data => {
          setDSNArray(data.prefix_list)
      })
      .catch(() => {
          setApiMsg("dsn-api not found")
      })
    }

    getDSNs();
  },[])

  return (
    <>
      <h1>DSN Europe</h1>
      <div>
        {apiMsg && <p className="errorMsg">{apiMsg}</p>}
        <h3>Commercial</h3>
        <DisplayDetails commInfo={DSNArray[enteredDSN]} extension={extension}/>
      </div>
      <div>
        <h3>DSN</h3>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <DSNRow 
          setEnteredDSN={setEnteredDSN} 
          setExtension={setExtension}
          commPrefix={DSNArray[enteredDSN]} 
          extension={extension}  
        />
      </div>      
    </>
  )
}

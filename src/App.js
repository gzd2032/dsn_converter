import React, { useState, useEffect } from 'react'
import DisplayDetails from './components/DisplayDetails'
import DSNRow from './components/DSNRow'
import './css/App.css'

const DSN_API_URL = process.env.REACT_APP_DSN_API_URL

function App() {
  const [enteredDSN, setEnteredDSN] = useState()
  const [extension, setExtension] = useState()
  const [DSNArray, setDSNArray] = useState({})
  const [errorMsg, setErrorMsg] = useState()
  const [apiMsg, setApiMsg] = useState()

  useEffect(() => {
    const displayNumber = DSNArray[enteredDSN]
    if (enteredDSN != null && displayNumber == null)
      setErrorMsg("Not a valid DSN Prefix")
    else
      setErrorMsg()
  }, [enteredDSN])

  useEffect(() => {
    fetch(DSN_API_URL)
    .then(res => res.json())
    .then(data => {
        setDSNArray(data.prefix_list)
    })
    .catch(() => {
        setApiMsg("dsn-api not found")
    })
  },[])


  return (
    <div className="appBody">
      <h1>DSN Europe</h1>
      <div>
        {apiMsg && <p className="errorMsg">{apiMsg}</p>}
        <h3>Commercial</h3>
        <DisplayDetails commPrefix={DSNArray[enteredDSN]} extension={extension}/>
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

    </div>
  );
}


export default App;

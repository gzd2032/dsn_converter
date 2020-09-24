import React, { useState, useEffect } from 'react';
import DisplayDetails from './components/DisplayDetails';
import DSNRow from './components/DSNRow'
import './css/App.css';

const DSN_API_URL = process.env.REACT_APP_DSN_API_URL

function App() {
  const [enteredDSN, setEnteredDSN] = useState()
  const [extension, setExtension] = useState()
  const [DSNArray, setDSNArray] = useState({})

  useEffect(() => {
    fetch(DSN_API_URL)
    .then(res => res.json())
    .then(data => {
        setDSNArray(data.prefix_list)
        console.log(data.prefix_list)
    })
  },[])


  return (
    <div className="appBody">
      <h1>DSN Converter</h1>
      <div>
        <h3>Commercial</h3>
        <DisplayDetails commPrefix={DSNArray[enteredDSN]} extension={extension}/>
      </div>
      <div>
        <h3>DSN</h3>
        <DSNRow number={enteredDSN} setEnteredDSN={setEnteredDSN} setExtension={setExtension}/>
      </div>

    </div>
  );
}


export default App;

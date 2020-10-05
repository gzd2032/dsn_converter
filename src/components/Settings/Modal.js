//Component to display the popup modal after clicking on the edit button for each DSN

import React, {useContext, useRef} from 'react'
import Select from 'react-select'
import ReactDom from 'react-dom'
import { SettingsContext } from './Settings'
import { useAuth0 } from "@auth0/auth0-react"

export default function Modal({ openModal, selectedDsn }) {
    const setDSNApi = useContext(SettingsContext)
    const DSN_API_URL = process.env.REACT_APP_DSN_API_URL
    const formInput = useRef(null)
    const {getAccessTokenSilently} = useAuth0()
    if (!openModal) return null

    const updateDsn = async () => {
        const inputData = formInput.current
        const updateId = parseInt(inputData["id"].value)
        const jwt = await getAccessTokenSilently()
        const formData = {
            'comm_prefix': inputData['comm_prefix'].value,
            'dsn_prefix': inputData['dsn_prefix'].value,
            'description': inputData['description'].value,
            'location_id': parseInt(inputData['location'].value)
        }
        console.log(formData)
        fetch(`${DSN_API_URL}/prefixes/${updateId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': 'bearer ' + jwt  
            },
            body: JSON.stringify(formData)
        } )
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                const newInfo = data.prefix_list
                setDSNApi.setItemList( prevItemList => {
                    const newItemlist = [...prevItemList]
                    const newItem = newItemlist.find( item => item.id === updateId)
                    newItem["comm_prefix"] = newInfo.comm_prefix
                    newItem["dsn_prefix"] = newInfo.dsn_prefix
                    newItem["description"] = newInfo.description
                    newItem["location"] = newInfo.location
                    newItem["location_id"] = newInfo.location_id

                    return newItemlist
                })
                setDSNApi.setOpenModal(false)

            }
        })
        .catch(e => {
            console.log(e.message)
        })

    }

    const closeModal = (e) => {
        setDSNApi.setOpenModal(false)
        setDSNApi.setSelectedDsnId()
    }   

    return ReactDom.createPortal(
        <>
            <div className="itemModaloverlay" onClick={() => closeModal()} />
            <div className="itemModal">
                <button className="closeBtn" onClick={() => closeModal()}>&times;</button> 
                <form ref={formInput}>
                <div className="itemModal--content">
                    <div>
                        <label htmlFor="id">Id</label>
                        <label htmlFor="dsn_prefix">DSN</label>
                        <label htmlFor="comm_prefix">Comm</label>
                        <label htmlFor="comm_prefix">Description</label>
                        <label htmlFor="location">Location</label>


                    </div>
                    <div>
                        <input disabled type="number" id="id" name="id" defaultValue={selectedDsn.id}></input>
                        <input type="text" id="dsn_prefix" name="dsn_prefix" defaultValue={selectedDsn.dsn_prefix}></input>
                        <input type="text" id="comm_prefix" name="comm_prefix" defaultValue={selectedDsn.comm_prefix}></input>   
                        <input type="text" id="description" name="description" defaultValue={selectedDsn.description}></input>   
                        <Select id="location" name="location" defaultValue={{label: selectedDsn.location, value: selectedDsn.location_id}} options={setDSNApi.locationList} />
                  

                    </div>
                </div>
                </form>
                <div>
                        <button onClick={() => updateDsn()}>Update</button>
                        <button>Delete</button>
                    </div>                
            </div>
        </>
    , document.getElementById('portal')
    )
}

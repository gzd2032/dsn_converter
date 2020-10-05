import React, { useState, createContext, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import ShowList from './ShowList';
import Pagination from './Pagination';
import Modal from './Modal';

const API_URL = process.env.REACT_APP_DSN_API_URL 

export const SettingsContext = createContext(null)

export default function Settings() {
    const [itemList, setItemList] = useState(dsn_default)
    const [loading, setLoading] = useState(false)
    const [locationList, setLocationList] = useState({})
    const {isAuthenticated} = useAuth0()
    const [currentPage, setCurrentPage] = useState(1)
    const [openModal, setOpenModal] = useState(false)
    const [seletedDsnId, setSelectedDsnId] = useState()

    const itemsPerPage = 10
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = itemList ? itemList.slice(indexOfFirstItem, indexOfLastItem) : {}

    const selectedDsn = itemList.find( dsn => dsn.id === seletedDsnId)
    
    const setDSNApi = { setSelectedDsnId, setOpenModal, setItemList, locationList }

    useEffect(() => {
        const getDsns = async () => {
            setLoading(true)
            await fetch(API_URL + "/prefixes/dsn")
            .then(res => res.json())
            .then(data => {

                let sortedDSN = [...data.dsn];
                sortedDSN.sort((a, b) => {
                    if (a.dsn_prefix < b.dsn_prefix) {
                    return -1;
                    }
                    if (a.dsn_prefix > b.dsn_prefix) {
                    return 1;
                    }
                    return 0;
                });
                setItemList(sortedDSN)
                setLoading(false)
            })
            .catch((e) => {
                console.log(e.message)
            })
        }

        getDsns();

    }, [])

    useEffect(() => {
        const getLocations = async () => {
            await fetch(API_URL + "/locations")
            .then(res => res.json())
            .then(data => {
                let sortedLocations = [...data.locations];
                sortedLocations.sort((a, b) => {
                    if (a.name < b.name) {
                    return -1;
                    }
                    if (a.name > b.name) {
                    return 1;
                    }
                    return 0;
                });

                const options = sortedLocations.map(d => ({
                    "value" : d.id,
                    "label" : d.name
                }))
                setLocationList(options)                
            })
            .catch( e => {
                console.log(e.message)
            })
        }

        getLocations()

    },[])

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    return (
        <>
            <h2>Settings</h2> 
            {isAuthenticated && 
            (<>
                <SettingsContext.Provider value={ setDSNApi }>
                    <div>
                        <ShowList 
                            itemList={currentItems} 
                            loading={loading}
                        />                        
                        <Pagination 
                            itemsPerPage={itemsPerPage} 
                            totalItems={itemList ? itemList.length : 0 }
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </div>
                    <Modal 
                        openModal={openModal}
                        selectedDsn={selectedDsn}
                    ></Modal>
                </SettingsContext.Provider>
            </>
            )}
        </>
    )
}

const dsn_default = [{
    'id':1,
    'name':'default'
},{
    'id': 2,
    'name':'default'
}
]
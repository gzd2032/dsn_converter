//Component to display DSN items

import React, {useContext} from 'react'
import { SettingsContext } from './Settings'

export default function ShowListItem(props) {
    const {
        id,
        dsn_prefix,
        comm_prefix,
        location
    } = props

    const setDSNApi = useContext(SettingsContext)

    const toggleModal = () => {
        setDSNApi.setOpenModal(true)
        setDSNApi.setSelectedDsnId(id)
    }

    return (
        <>
            <div className="item"><button onClick={() => toggleModal()}>Edit</button></div>
            <div className="item">{dsn_prefix}</div>
            <div className="item">{comm_prefix}</div>
            <div className="item">{location}</div>
        </>
    )

}

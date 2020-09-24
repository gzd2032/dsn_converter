import React from 'react'

export default function DisplayDetails({ commPrefix, extension }) {
    return (
        <>
            {(commPrefix && <div className="commOutput">{ commPrefix } { extension }</div>) || <p>Enter a Valid DSN Prefix</p>}
        </>
    )
}

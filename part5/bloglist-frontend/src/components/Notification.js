import React from 'react'

const Notification = ( {message} ) => {
    if (!message) {
        return null
    }

    return (
        <div className="notification">
            <h1>{message}</h1>
        </div>
    )
}

export default Notification
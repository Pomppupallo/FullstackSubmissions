import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const message = useSelector(state => state.notification)
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
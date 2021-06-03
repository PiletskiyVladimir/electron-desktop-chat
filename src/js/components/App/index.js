import React from "react";

export default function App () {
    const sendNotification = () => {
        Electron.sendNotification('Custom message')
    }

    return (
        <>
            <button onClick={sendNotification}>Send Notification</button>
        </>
    )
}
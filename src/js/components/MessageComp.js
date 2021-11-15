import React from 'react';
import {toJS} from "mobx";

export default function MessageComp({messageObj}) {
    let myMessage = messageObj.sender === localStorage.getItem('id') ? 'my-message' : 'inner-message';
    return <div className={myMessage}>
        <p className="message">
            {messageObj.messageObj.message}
        </p>
        <p className="message-time">
            {messageObj.createdAt}
        </p>
    </div>
}
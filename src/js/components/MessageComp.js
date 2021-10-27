import React from 'react';
import {toJS} from "mobx";

export default function MessageComp({messageObj}) {
    let myMessage = messageObj.sender === localStorage.getItem('id') ? 'my-message' : 'inner-message';
    // console.log(toJS(messageObj));
    return <div className="message-obj">
        <p className={myMessage}>
            {messageObj.messageObj.message}
        </p>
    </div>
}
import React, {useEffect} from "react";
import {observer} from "mobx-react";
import MessageComp from "./MessageComp";

const DialogMessageBox = observer(({store}) => {
    let messagesEnd = React.useRef < HTMLInputElement > null;

    useEffect(() => {
        messagesEnd.scrollIntoView({behavior: "auto"})
    });

    return <div className="message-box">
        {
            store.messages.map(el => {
                return <MessageComp messageObj={el} key={el.id}/>
            })
        }

        <div style={{float: "left", clear: "both"}}
             ref={(el) => {
                 messagesEnd = el;
             }}>
        </div>
    </div>
});

export default DialogMessageBox;
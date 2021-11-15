import React from 'react';

import {useHistory, useParams} from "react-router-dom";

import {observer} from "mobx-react";
import {toJS} from "mobx";
import socket from "../socket";


const DialogHeader = observer(({store}) => {
    let history = useHistory();
    return <div className="dialog-header">
        <div className="dialog-header-left">
            <img src="./build/assets/arrowback.png" alt="HELP" onClick={() => {
                socket.emit('leaveRoom', `${store.roomObj?.id}${localStorage.getItem('id')}`);
                store.clearDialogPage();
                history.goBack();
            }}/>
        </div>
        <div className="dialog-header-right">
            <img
                src={store.roomObj?.otherUser?.avatar ? process.env.BACKEND_URL + "/" + store.roomObj.otherUser.avatar : "./build/assets/defaultAvatar.png"}
                alt="" className="dialog-header-avatar"/>
            <div className="dialog-header-user-info-block">
                <p className="dhuibf">{store.roomObj?.otherUser?.name} {store.roomObj?.otherUser?.lastName}</p>
                <p className="dhuibs">{store.roomObj?.otherUser?.onlineStatus}</p>
            </div>
        </div>
        <div className="clear"></div>
    </div>
})

export default DialogHeader;
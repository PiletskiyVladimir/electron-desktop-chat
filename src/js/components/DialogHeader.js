import React from 'react';

import {useHistory, useParams} from "react-router-dom";

import {observer} from "mobx-react";
import {toJS} from "mobx";


const DialogHeader = observer(({store}) => {
    let history = useHistory();
    return <div className="dialog-header">
        <div className="dialog-header-left">
            <img src="./build/assets/arrowback.png" alt="HELP" onClick={() => history.goBack()}/>
        </div>
        <div className="dialog-header-right">
            <img
                src={store.roomObj?.otherUser?.avatar ? process.env.BACKEND_URL + "/" + store.roomObj.otherUser.avatar : null}
                alt="" className="dialog-header-avatar"/>
            <div className="dialog-header-user-info-block">
                <p>{store.roomObj?.otherUser?.name} {store.roomObj?.otherUser?.lastName}</p>
                <p>{store.roomObj?.otherUser?.onlineStatus}</p>
            </div>
        </div>
        <div className="clear"></div>
    </div>
})

export default DialogHeader;
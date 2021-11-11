import React, {useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import {observer} from "mobx-react";
import {getRoomDetailApi} from '../api/room';
import {getMessagesApi} from '../api/message';

import '../styles/DialogPage.css';
import '../styles/Message.css';

import DialogHeader from './DialogHeader';
import DialogBottom from "./DialogBottom";
import DialogMessageBox from "./DialogMessageBox";
import {toJS} from "mobx";

import socket from '../socket';

import {decryptMessages} from "../utils/cryptDecrypt";


const DialogPage = observer(({store}) => {
    let history = useHistory();
    let {id} = useParams();

    useEffect(async () => {
        socket.on('new-room-message', (data) => {
            data = JSON.parse(data);
            store.pushMessage(data);
        });

        let [apiDetail, apiDetailError] = await getRoomDetailApi(id);

        if (apiDetailError) {
            switch (apiDetailError.status) {
                case 404:
                    history.push('/not-found');
                    break;
                default:
                    history.push('/error');
                    break;
            }
        }

        store.setRoomId(id);

        store.setRoomObj(apiDetail.data);

        let [messages, messagesError] = await getMessagesApi(id);

        if (messagesError) history.push('/error');

        store.setMessages(messages.data);

        document.addEventListener('keydown', (event) => {
            if (event.keyCode === 27) {
                history.goBack();
            }
        });
    }, []);

    return <div className="dialog-page">
        <DialogHeader store={store}/>

        <DialogMessageBox store={store} />

        <DialogBottom store={store} />
    </div>
});

export default DialogPage;
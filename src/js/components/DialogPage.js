import React, {useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {observer} from "mobx-react";
import axios from "../utils/axios";
import {getRoomDetailApi} from '../api/room';
import {createMessageApi, getMessagesApi} from '../api/message';
import {cryptMessage} from "../utils/cryptDecrypt";

import MessageComp from "./MessageComp";

import '../styles/DialogPage.css';
import '../styles/Message.css';

import DialogHeader from './DialogHeader';
import DialogBottom from "./DialogBottom";
import DialogMessageBox from "./DialogMessageBox";


const DialogPage = observer(({store}) => {
    let history = useHistory();
    let {id} = useParams();

    useEffect(async () => {
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
    }, []);

    // TODO

    /*
        вынести верхний блок в отдельный компонент
        вынести центральний блок в отдельный компонент
        вынести нижний блок в отдельный компонент

        при этом всем пусть у них и дальше будет общее хранилище, хотя у верхнего блока его может и не быть, подумать как реализовать
     */

    return <div className="dialog-page">
        <DialogHeader store={store}/>

        <DialogMessageBox store={store} />

        <DialogBottom store={store} />
    </div>
});

export default DialogPage;
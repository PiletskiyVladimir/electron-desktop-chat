import React, {useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {observer} from "mobx-react";
import {getRoomsApi} from "../api/mainView";
import Axios from "axios";
import JsEncrypt from 'jsencrypt';
import RoomObj from "./RoomObj";

import '../styles/MainView.css';

import {getUserDataApi} from "../api/user";
import MainViewProfile from "./MainViewProfile";
import MainViewRooms from "./MainViewRooms";

import socket from "../socket";

import {decryptMessagesFromRoomObj} from "../utils/cryptDecrypt";

let crypt = new JsEncrypt();

const MainView = observer(({store}) => {
    let history = useHistory();

    useEffect(async () => {
        console.log('effect');
        let [user, userError] = await getUserDataApi(localStorage.getItem('id'));

        socket.off('new-message');
        socket.off('new-room-message');

        socket.on('new-message', (data) => {
            data = JSON.parse(data);
            let updatedRooms = [];
            let neededRoom = {};
            for (let i = 0; i < store.rooms.length; i++) {
                let obj = JSON.parse(JSON.stringify(store.rooms[i]));
                if (obj.id === data.room) {
                    obj.lastMessage = data;
                    neededRoom = store.decryptOneRoom(obj);
                } else {
                    updatedRooms.push(obj);
                }
            }

            updatedRooms = [neededRoom, ...updatedRooms];

            store.setRoomsWithoutDecryption(updatedRooms);
        })

        socket.on('new-room', (data) => {
            store.updateRooms(data);
        })

        if (userError) {
            switch (userError.status) {
                case 404:
                    history.push('/not-found');
                    break;
                default:
                    history.push('/error');
                    break;
            }
        }

        let [rooms, error] = await getRoomsApi();

        if (error) {
            switch (error.status) {
                case 404:
                    history.push('/not-found');
                    break;
                default:
                    history.push('/error');
                    break;
            }
        }

        let privateKey = await Axios.get('./private.pem');

        store.setRoomAndUserAndKeys(user.data, privateKey.data, user.data.publicKey, rooms.data.data);

        crypt.setPublicKey(store.publicKey);
        crypt.setPrivateKey(store.privateKey);
    }, []);

    return (
        <div className="main-view">
            <MainViewProfile    store={store} />
            <MainViewRooms      store={store} />
            <div className="clear">
            </div>
        </div>
    )
});

export default MainView;
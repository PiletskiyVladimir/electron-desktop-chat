import React, {useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {observer} from "mobx-react";
import {getRoomsApi} from "../api/mainView";
import Axios from "axios";
import JsEncrypt from 'jsencrypt';
import RoomObj from "./RoomObj";

let crypt = new JsEncrypt();

const MainView = observer(({store}) => {
    let history = useHistory();
    useEffect(async () => {
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

        store.mainViewStore.setRooms(rooms.data.data);

        let [privateKey, publicKey] = await Promise.all([
            Axios.get('./build/piletskiyPrivate.txt'),
            Axios.get('./build/piletskiyPublic.txt')
        ])

        store.setPrivateKey(privateKey.data);
        store.setPublicKey(publicKey.data);

        crypt.setPublicKey(store.publicKey);
        crypt.setPrivateKey(store.privateKey);
    }, []);

    return (
        <>
            {
                store.mainViewStore.getRooms().map(el => {
                    return <RoomObj store={el}/>
                })
            }
        </>
    )
});

export default MainView;
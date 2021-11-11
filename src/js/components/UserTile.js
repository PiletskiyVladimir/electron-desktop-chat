import React from "react";
import {useHistory} from "react-router-dom";
import {getOrCreateRoom} from "../api/mainView";
import {toJS} from "mobx";
import socket from "../socket";

export default function UserTile({user}) {
    console.log(toJS(user));
    let history = useHistory();
    let imageStyleObj = {
        backgroundImage: user.avatar ? "url(" + process.env.BACKEND_URL + "/" + user.avatar + ")" : "url('./build/assets/defaultAvatar.png')"
    }

    return <div
        className="user-tile"
        onClick={
            async (e) => {
                let [room, roomError] = await getOrCreateRoom(user.id);
                socket.emit('joinRoom', `${room.data.id}${localStorage.getItem('id')}`);
                history.push(`/room/${room.data.id}`);
            }
        }
    >
        <div className="user-tile-avatar" style={imageStyleObj}>
        </div>
        <p>{user.name + " " + user.lastName}</p>
        <div className="clear">
        </div>
    </div>
}
import {useHistory} from "react-router-dom";
import React from 'react';
import socket from "../socket";

export default function RoomObj({room}) {
    let history = useHistory();
    let imageStyleObj = {
        backgroundImage: room.otherUser.avatar ? "url(" + process.env.BACKEND_URL + "/" + room.otherUser.avatar + ")" : "url('./build/assets/defaultAvatar.png')"
    }
    return (
        <div
            className="roomClass"
            onClick={
                () => {
                    socket.emit('joinRoom', `${room.id}${localStorage.getItem('id')}`);
                    history.push(`/room/${room.id}`)
                }
            }
        >
            <div className="roomClass-avatar" style={imageStyleObj}>
            </div>
            <div className="roomClass-info">
                <p className="room-user-name">{room.otherUser.name + " " + room.otherUser.lastName}</p>
                <p className="room-last-message">{room.lastMessage?.messageObj.message}</p>
                <p className="room-last-message-time">{room.lastMessage?.createdAt}</p>
            </div>
            <div className="clear">
            </div>
        </div>
    )
}
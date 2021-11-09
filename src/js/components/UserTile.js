import React from "react";

export default function UserTile({user}) {
    let imageStyleObj = {
        backgroundImage: user.avatar ? "url(" + process.env.BACKEND_URL + "/" + user.avatar + ")" : "url('./build/assets/defaultAvatar.png')"
    }

    return <div className="user-tile">
        <div className="user-tile-avatar" style={imageStyleObj}>
        </div>
        <p>{user.name + " " + user.lastName}</p>
        <div className="clear"></div>
    </div>
}
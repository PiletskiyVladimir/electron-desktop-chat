import React, {useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {observer} from "mobx-react";

const RoomObj = observer(({store}) => {
    let history = useHistory();

    return (
        <div className="roomClass"
             onClick={() => {
                history.push(`/room/${store.id}`)
             }}>
            <p>{store.id}</p>
        </div>
    )
});

export default RoomObj;
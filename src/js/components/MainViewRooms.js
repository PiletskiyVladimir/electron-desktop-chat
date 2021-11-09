import React, {useEffect} from 'react';
import {observer} from "mobx-react";
import RoomObj from "./RoomObj";
import MainViewSearch from './MainViewSearch';
import {useHistory} from "react-router-dom";
import UserTile from "./UserTile";

const MainViewRooms = observer(({store}) => {
    let history = useHistory();

    return <div className="main-view-rooms">
        <MainViewSearch store={store} />
        {
            store.searchPeopleInput.length === 0
                ?
                store.getRooms().map(el => {
                    return <RoomObj room={el} key={el.id}/>
                })
                :
                store.foundedUsers.map(el => {
                    return <UserTile user={el} key={el.id}/>
                })
        }
    </div>
})

export default MainViewRooms;
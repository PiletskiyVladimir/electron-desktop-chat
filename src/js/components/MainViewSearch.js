import {observer} from "mobx-react";
import React from "react";
import {findUsersByNickname} from "../api/mainView";

const MainViewSearch = observer(({store}) => {
    return <input
        type="text"
        className="user-search-input"
        value={store.searchPeopleInput}
        onChange={
            async (e) => {
                store.changeSearchPeopleValue(e.target.value);
                let [result, resultError] = await findUsersByNickname(e.target.value);

                if (resultError) {
                    history.push('/error');
                }
                store.setFoundedUsers(result.data.data);
            }
        }
        placeholder="Input user nickname to find him"
    />
})

export default MainViewSearch;
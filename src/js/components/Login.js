import React from "react";
import {observer} from "mobx-react";

import {getToken} from "../api/login";
import MainStore from "../store/MainStore";

const Login = observer(({store}) => {
    return (
        <>
            <input
                type="text"
                className={store.loginStore.loginInputStyle}
                value={store.loginStore.loginInputValue}
                onChange={(e) => {
                    store.loginStore.changeInputStyle('normal');
                    store.loginStore.changeInputValue(e.target.value);
                }}
            />
            <button
                onClick={async () => {
                    // TODO token handling, errors check

                    console.log(await getToken(MainStore.sendCodeStore.sendCodeInputValue, store.loginStore.loginInputValue))
                }}
            >
                Confirm code
            </button>
        </>
    )

})

export default Login;
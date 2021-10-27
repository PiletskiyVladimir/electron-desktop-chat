import React from "react";
import {observer} from "mobx-react";

import {getTokenApi} from "../api/login";
import MainStore from "../store/MainStore";

import {useHistory} from 'react-router-dom';

const Login = observer(({store}) => {
    let history = useHistory();
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
                    let [token, error] = await getTokenApi(store.sendCodeStore.sendCodeInputValue, store.loginStore.loginInputValue);
                    if (error) history.push('/not-found');
                    if (token.status !== 200) {
                        store.loginStore.changeInputValue("");
                        Electron.errors.showError('error', 'Invalid code', 'Authorization error')
                    } else {
                        localStorage.setItem('id', token.data.id);
                        localStorage.setItem('token', token.data.token);
                        history.push('/main-view');
                    }
                }}
            >
                Confirm code
            </button>
        </>
    )

})

export default Login;
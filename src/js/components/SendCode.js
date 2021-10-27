import React from "react";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import {useHistory} from 'react-router-dom';

import '../styles/SendCode.css';

const SendCode = observer(({store}) => {
    let history = useHistory();
    return (
        <>
            <input
                className={store.classList}
                type="text"
                placeholder={store.placeholder}
                value={store.sendCodeInputValue}
                onChange={(e) => {
                    if (store.classList === 'warning') store.setNormalStyle();
                    store.setSendCodeInput(e.target.value)
                }}
            />
            <button onClick={async () => {
                let [sent, error] = await store.sendCode(store.sendCodeInputValue);

                if (error) history.push('/error');

                switch (sent.status) {
                    case 200: {
                        history.push('/login');
                        break;
                    }
                    case 400: {
                        store.setErrorStyle();
                        break;
                    }
                    case 404: {
                        Electron.errors.showError('error', `User with email ${store.sendCodeInputValue} was not found`, 'User not found');
                        break;
                    }
                }
            }}>
                Send code
            </button>
            <p>
                Or you can register if you doesnt have account already using <Link to="/register">this</Link> link
            </p>
        </>
    )
})

export default SendCode;
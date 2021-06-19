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
                className={store.sendCodeStore.classList}
                type="text"
                placeholder={store.sendCodeStore.placeholder}
                value={store.sendCodeStore.sendCodeInputValue}
                onChange={(e) => {
                    if (store.sendCodeStore.classList === 'warning') store.sendCodeStore.setNormalStyle();
                    store.sendCodeStore.setSendCodeInput(e.target.value)
                }}
            />
            <button onClick={async () => {
                let sent = await store.sendCodeStore.sendCode(store.sendCodeStore.sendCodeInputValue);

                if (!sent) {
                    store.sendCodeStore.setErrorStyle();
                } else {
                    history.push('/login')
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
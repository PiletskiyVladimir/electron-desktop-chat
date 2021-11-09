import React from "react";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import {useHistory} from 'react-router-dom';
import Popup from "./Popup";

import '../styles/SendCode.css';

const SendCode = observer(({store}) => {
    let history = useHistory();
    let backImageStyleObj = {
        backgroundImage: `url('./build/assets/defaultAvatar.png')`
    }
    return (
        <div className={'absolute-block'}>
            <Popup behaviour={store.behaviour} display={store.popupShow} info={store.popupText} />
            <div className="block-with-inputs">
                <div className="register-image" style={backImageStyleObj}>
                </div>
                <input
                    className={store.classList + " send-code-input"}
                    type="text"
                    placeholder={store.placeholder}
                    value={store.sendCodeInputValue}
                    onChange={(e) => {
                        if (store.classList === 'warning') store.setNormalStyle();
                        store.setSendCodeInput(e.target.value)
                    }}
                />
                <button className={'btn-reg-login'} onClick={async () => {
                    if (store.sendCodeInputValue.length === 0) {
                        return store.setErrorStyle();
                    }

                    let [sent, error] = await store.sendCode(store.sendCodeInputValue);

                    if (error) {
                        switch (error.status) {
                            case 400: {
                                store.setErrorStyle();
                                break;
                            }
                            case 404: {
                                store.popupText = `User with email ${store.sendCodeInputValue} was not found`;
                                store.popupShow = 'block';
                                store.sendCodeInputValue = '';
                                break;
                            }
                        }
                    }

                    if (sent) {
                        history.push('/login');
                    }
                }}>
                    Send code
                </button>
                <p>
                    Or you can register if you doesnt have account already using <Link to="/register" className={'link'}>this</Link> link
                </p>
            </div>
        </div>
    )
})

export default SendCode;
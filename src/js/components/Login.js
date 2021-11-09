import React, {useRef} from "react";
import {observer} from "mobx-react";

import {getTokenApi} from "../api/login";
import MainStore from "../store/MainStore";

import {useHistory} from 'react-router-dom';
import '../styles/Login.css';
import Popup from "./Popup";

const Login = observer(({store}) => {
    let mailInputValue = store.sendCodeStore.sendCodeInputValue || store.registerStore.emailInputValue;
    let history = useHistory();
    let backImageStyleObj = {
        backgroundImage: `url('./build/assets/defaultAvatar.png')`
    }
    let privateRef = useRef(null);
    return (
        <div className={'absolute-block'}>
            <Popup behaviour={store.loginStore.behaviour} info={store.loginStore.popupText}
                   display={store.loginStore.popupShow}/>
            <div className="block-with-inputs">
                <div className="register-image" style={backImageStyleObj}>
                </div>
                <input type="text" className='email-login' value={mailInputValue} readOnly/>
                <input
                    placeholder="Input code from email letter"
                    type="text"
                    className={store.loginStore.loginInputStyle + " code-login"}
                    value={store.loginStore.loginInputValue}
                    onChange={(e) => {
                        store.loginStore.changeInputStyle('normal');
                        store.loginStore.changeInputValue(e.target.value);
                    }}
                />
                <input
                    type="file"
                    ref={privateRef}
                    style={{display: 'none'}}
                    accept=".pem, .txt"
                    onChange={event => {
                        event.preventDefault()
                        const reader = new FileReader()
                        reader.onload = async (e) => {
                            const text = (e.target.result)
                            Electron.files.keySave('keySave', text, 'private');
                            store.loginStore.privateKey = text;
                            store.loginStore.btnText = 'File uploaded!';
                        };
                        reader.readAsText(event.target.files[0])
                    }}
                />
                <button className="upload-btn"
                        onClick={() => privateRef.current.click()}>{store.loginStore.btnText}</button>
                <button
                    className="btn-reg-login login-btn"
                    onClick={async () => {
                        if (!store.loginStore.privateKey) {
                            store.loginStore.popupText = 'Set your private key for normal work of application';
                            store.loginStore.popupShow = 'block';
                            return;
                        }

                        if (store.loginStore.loginInputValue.length === 0) {
                            store.loginStore.popupText = 'Enter code from your email';
                            store.loginStore.popupShow = 'block';
                        }

                        if (!mailInputValue) {
                            store.loginStore.popupText = 'Please try login or register again';
                            store.loginStore.behaviour = () => {
                                history.push('/send-code')
                            };
                            store.loginStore.popupShow = 'block';
                        }

                        let [token, error] = await getTokenApi(mailInputValue, store.loginStore.loginInputValue);
                        if (error) {
                            store.loginStore.popupText = error;
                            store.loginStore.popupShow = 'block';
                        }
                        if (token.status !== 200) {
                            store.loginStore.changeInputValue("");
                            store.loginStore.popupText = 'User not found';
                            store.loginStore.popupShow = 'block';
                        } else {
                            localStorage.setItem('id', token.data.id);
                            localStorage.setItem('token', token.data.token);
                            history.push('/main-view');
                            store.loginStore.loginInputValue = '';
                            store.registerStore.clearAllInputs();
                        }
                    }}
                >
                    Confirm code
                </button>
            </div>
        </div>
    )

})

export default Login;
import React, {useRef} from "react";
import {Link, useHistory} from "react-router-dom";
import {observer} from "mobx-react";
import keypair from "keypair";

import {validate} from 'email-validator';
import '../styles/Register.css';
import {JSEncrypt} from "jsencrypt";
import Popup from "./Popup";

const Register = observer(({store}) => {
    let backImageStyleObj = {
        backgroundImage: `url('./build/assets/defaultAvatar.png')`
    }
    let history = useHistory();

    return (
        <div className={'absolute-block'}>
            <Popup behaviour={() => {history.push('/login')}} info={'Your private and public key were generated successfully, you can find them in root directory of application'} display={store.showPopup}/>
            <div className="block-with-inputs">
                <div className="register-image" style={backImageStyleObj}>
                </div>
                <input type="text" className={`${store.emailInputStyle} email-reg`} value={store.emailInputValue} onChange={(e) => {
                    store.changeInputValue(e.target.value, 'emailInputValue')
                }}
                       placeholder={"Enter your email"}
                />
                <input type="text" className={`${store.nameInputStyle} name-reg`} value={store.nameInputValue} onChange={(e) => {
                    store.changeInputValue(e.target.value, 'nameInputValue')
                }}
                       placeholder={"Enter your name"}
                />
                <input type="text" className={`${store.lastNameInputStyle} last-name-reg`} value={store.lastNameInputValue} onChange={(e) => {
                    store.changeInputValue(e.target.value, 'lastNameInputValue')
                }}
                       placeholder={"Enter your lastName"}
                />
                <input type="text" className={`${store.nicknameInputStyle} nickname-reg`} value={store.nicknameInputValue} onChange={(e) => {
                    store.changeInputValue(e.target.value, 'nicknameInputValue')
                }}
                       placeholder={"Enter your nickname"}
                />

                {/*<button className="upload-btn" onClick={() => publicRef.current.click()}>Upload public key</button>*/}
                {/*<button className="upload-btn" onClick={() => privateRef.current.click()}>Upload private key</button>*/}

                {/*<input*/}
                {/*    id='file'*/}
                {/*    ref={publicRef}*/}
                {/*    style={{display: 'none'}}*/}
                {/*    type="file"*/}
                {/*    accept=".pem, .txt"*/}
                {/*    onChange={(e) => fileOnChange(e, 'public') }*/}
                {/*/>*/}

                {/*<input*/}
                {/*    id='file'*/}
                {/*    ref={privateRef}*/}
                {/*    style={{display: 'none'}}*/}
                {/*    type="file"*/}
                {/*    accept=".pem, .txt"*/}
                {/*    onChange={(e) => fileOnChange(e, 'private') }*/}
                {/*/>*/}

                <button className="btn-reg-login" onClick={async () => {
                    let hasErrors = false;

                    let crypt = new JSEncrypt({default_key_size: 512, log: true});
                    crypt.getKey();
                    store.setPublicKey(crypt.getPublicKey());
                    store.setPrivateKey(crypt.getPrivateKey());

                    if (store.emailInputValue === '' || !validate(store.emailInputValue)) {
                        store.changeInputStyle('warning', 'emailInputStyle');
                        hasErrors = true;
                    }

                    if (store.nameInputValue === '') {
                        store.changeInputStyle('warning', 'nameInputStyle');
                        hasErrors = true;
                    }

                    if (store.lastNameInputValue === '') {
                        store.changeInputStyle('warning', 'lastNameInputStyle');
                        hasErrors = true;
                    }

                    if (store.nicknameInputValue === '') {
                        store.changeInputStyle('warning', 'nicknameInputStyle');
                        hasErrors = true;
                    }

                    if (hasErrors) return;

                    Electron.files.keySave('keySave', store.publicKey, 'public');
                    Electron.files.keySave('keySave', store.privateKey, 'private');

                    let [response, error] = await store.registerUser();

                    if (error) {
                        console.log(error);
                        switch (error.status) {
                            case 409:
                                switch (response.errors.field) {
                                    case 'nickname':
                                        store.changeInputStyle('warning', 'nicknameInputStyle');
                                        Electron.errors.showError('error', 'User with such nickname already exist!', 'Registration error');
                                        break;
                                    case 'email':
                                        store.changeInputStyle('warning', 'emailInputStyle');
                                        Electron.errors.showError('error', 'User with such email already exist!', 'Registration error');
                                        break;
                                }
                                break;
                            case 400:
                                history.push('/error');
                                break;
                        }
                    }

                    // if (response) history.push('/login');
                    store.showPopup = 'block';
                }}>Register
                </button>

                <p>Or you can authorize by sending code on your email if you already have account using <Link
                    to="/send-code" className="link">this</Link> link</p>
            </div>
        </div>
    )
})

export default Register;
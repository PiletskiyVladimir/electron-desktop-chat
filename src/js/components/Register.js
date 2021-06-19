import React from "react";
import {Link, useHistory} from "react-router-dom";
import {observer} from "mobx-react";

import {validate} from 'email-validator';

const Register = observer(({store}) => {
    let history = useHistory();
    return(
        <>
            <input type="text" className={store.emailInputStyle} value={store.emailInputValue} onChange={(e) => {
                store.changeInputValue(e.target.value, 'emailInputValue')
            }}/>
            <input type="text" className={store.nameInputStyle} value={store.nameInputValue} onChange={(e) => {
                store.changeInputValue(e.target.value, 'nameInputValue')
            }}/>
            <input type="text" className={store.lastNameInputStyle} value={store.lastNameInputValue} onChange={(e) => {
                store.changeInputValue(e.target.value, 'lastNameInputValue')
            }}/>
            <input type="text" className={store.nicknameInputStyle} value={store.nicknameInputValue} onChange={(e) => {
                store.changeInputValue(e.target.value, 'nicknameInputValue')
            }}/>

            <button onClick={async () => {
                let hasErrors = false;

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

                let response = await store.registerUser();

                switch (response.status) {
                    case 200:
                        history.push('/login');
                        break;
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

                        break;
                }
            }}>Register</button>

            <p>Or you can authorize by sending code on your email if you already have account using <Link to="/send-code">this</Link> link</p>
        </>
    )
})

export default Register;
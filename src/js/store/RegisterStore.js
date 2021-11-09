import {makeAutoObservable} from "mobx";

import {registerUserApi} from "../api/register";

class RegisterStore {
    emailInputValue;
    nameInputValue;
    lastNameInputValue;
    nicknameInputValue;

    emailInputStyle;
    nameInputStyle;
    lastNameInputStyle;
    nicknameInputStyle;

    privateKey;
    publicKey;

    showPopup;

    constructor() {
        this.emailInputValue = '';
        this.nameInputValue = '';
        this.lastNameInputValue = '';
        this.nicknameInputValue = '';

        this.emailInputStyle = 'normal';
        this.nameInputStyle = 'normal';
        this.lastNameInputStyle = 'normal';
        this.nicknameInputStyle = 'normal';

        this.publicKey = null;
        this.privateKey = null;

        this.showPopup = 'none';

        makeAutoObservable(this);
    }

    changeInputValue(value, field) {
        switch (field) {
            case 'emailInputValue':
                this.changeInputStyle('normal', 'emailInputStyle');
                break;
            case 'nameInputValue':
                this.changeInputStyle('normal', 'nameInputStyle');
                break;
            case 'lastNameInputValue':
                this.changeInputStyle('normal', 'lastNameInputStyle');
                break;
            case 'nicknameInputValue':
                this.changeInputStyle('normal', 'nicknameInputStyle');
                break;
        }
        this[field] = value;
    }

    changeInputStyle(value, field) {
        this[field] = value;
    }

    setPublicKey (value) {
        this.publicKey = value;
    }

    setPrivateKey(value) {
        this.privateKey = value;
    }

    clearAllInputs() {
        this.emailInputValue = '';
        this.nameInputValue = '';
        this.lastNameInputValue = '';
        this.nicknameInputValue = '';

        this.emailInputStyle = 'normal';
        this.nameInputStyle = 'normal';
        this.lastNameInputStyle = 'normal';
        this.nicknameInputStyle = 'normal';

        this.publicKey = null;
        this.privateKey = null;
    }

    async registerUser() {
        return await registerUserApi(this.emailInputValue, this.nameInputValue, this.lastNameInputValue, this.nicknameInputValue, this.publicKey);
    }
}

export default RegisterStore;
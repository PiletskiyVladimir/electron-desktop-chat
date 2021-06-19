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

    constructor() {
        this.emailInputValue = '';
        this.nameInputValue = '';
        this.lastNameInputValue = '';
        this.nicknameInputValue = '';

        this.emailInputStyle = 'normal';
        this.nameInputStyle = 'normal';
        this.lastNameInputStyle = 'normal';
        this.nicknameInputStyle = 'normal';

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

    async registerUser() {
        return await registerUserApi(this.emailInputValue, this.nameInputValue, this.lastNameInputValue, this.nicknameInputValue);
    }
}

export default RegisterStore;
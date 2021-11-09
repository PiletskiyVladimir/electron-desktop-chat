import {makeAutoObservable} from "mobx";

class LoginStore {
    loginInputValue;
    loginInputStyle;

    btnText;
    privateKey;

    popupText;
    popupShow;
    behaviour;

    constructor() {
        this.loginInputValue = '';
        this.loginInputStyle = 'normal';

        this.btnText = 'Upload private key';
        this.privateKey = null;

        this.popupText = '';
        this.popupShow = 'none';
        this.behaviour = () => {this.popupShow = 'none'}

        makeAutoObservable(this);
    }

    changeInputValue(value) {
        this.loginInputValue = value;
    }

    changeInputStyle(value) {
        this.loginInputStyle = value;
    }
}

export default LoginStore;
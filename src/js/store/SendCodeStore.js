import {makeAutoObservable} from "mobx";
import {sendCodeApi} from "../api/login";

class SendCodeStore {
    classList;
    placeholder;
    sendCodeInputValue;

    popupText;
    popupShow;
    behaviour;

    constructor() {
        this.classList = 'normal';
        this.placeholder = 'Enter your email to receive code';
        this.sendCodeInputValue = '';

        this.popupText = '';
        this.popupShow = 'none';
        this.behaviour = () => {this.popupShow = 'none'}

        makeAutoObservable(this);
    }

    setErrorStyle() {
        this.classList = 'warning';
        this.placeholder = 'Your email is incorrect, please enter another';
    }

    setNormalStyle() {
        this.classList = 'normal';
        this.placeholder = 'Enter your email to receive code';
    }

    async sendCode(email) {
        return await sendCodeApi(email);
    };

    setSendCodeInput(value) {
        this.sendCodeInputValue = value;
    };
}

export default SendCodeStore;
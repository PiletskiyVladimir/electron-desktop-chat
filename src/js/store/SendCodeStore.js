import {makeAutoObservable} from "mobx";
import {sendCodeApi} from "../api/login";

class SendCodeStore {
    classList;
    placeholder;
    sendCodeInputValue;

    constructor() {
        this.classList = 'normal';
        this.placeholder = 'Enter your email to receive code';
        this.sendCodeInputValue = '';

        makeAutoObservable(this);
    }

    setErrorStyle() {
        this.classList = 'warning';
        this.placeholder = 'Your email is incorrect, please enter another';
    }

    setNormalStyle() {
        this.classList = 'normal'
    }

    async sendCode(email) {
        return await sendCodeApi(email);
    };

    setSendCodeInput(value) {
        this.sendCodeInputValue = value;
    };
}

export default SendCodeStore;
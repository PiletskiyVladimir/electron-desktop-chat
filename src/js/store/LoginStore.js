import {makeAutoObservable} from "mobx";

class LoginStore {
    loginInputValue;
    loginInputStyle;

    constructor() {
        this.loginInputValue = '';
        this.loginInputStyle = 'normal';

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
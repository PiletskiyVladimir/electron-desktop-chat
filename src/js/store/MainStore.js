import {makeAutoObservable} from "mobx";

import SendCodeStore from "./SendCodeStore";
import RegisterStore from "./RegisterStore";
import LoginStore from "./LoginStore";

class Store {
    sendCodeStore;
    registerStore;
    loginStore;

    constructor() {
        this.sendCodeStore = new SendCodeStore();
        this.registerStore = new RegisterStore();
        this.loginStore = new LoginStore();

        makeAutoObservable(this);
    }
}

let MainStore = new Store();

export default MainStore;
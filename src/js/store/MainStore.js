import {makeAutoObservable} from "mobx";

import SendCodeStore from "./SendCodeStore";
import RegisterStore from "./RegisterStore";

class Store {
    user;
    chats;
    sendCodeStore;
    registerStore;

    constructor() {
        this.user = {};
        this.chats = [];
        this.sendCodeStore = new SendCodeStore();
        this.registerStore = new RegisterStore();

        makeAutoObservable(this);
    }
}

let MainStore = new Store();

export default MainStore;
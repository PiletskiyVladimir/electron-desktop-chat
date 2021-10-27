import {makeAutoObservable} from "mobx";

import SendCodeStore from "./SendCodeStore";
import RegisterStore from "./RegisterStore";
import LoginStore from "./LoginStore";
import MainViewStore from "./MainViewStore";
import DialogPageStore from "./DialogPageStore";

class Store {
    sendCodeStore;
    registerStore;
    loginStore;
    mainViewStore;
    dialogPageStore;

    privateKey;
    publicKey;

    constructor() {
        this.sendCodeStore      = new SendCodeStore();
        this.registerStore      = new RegisterStore();
        this.loginStore         = new LoginStore();
        this.mainViewStore      = new MainViewStore();
        this.dialogPageStore    = new DialogPageStore();
        this.privateKey         = null;
        this.publicKey          = null;

        makeAutoObservable(this);
    }

    setPrivateKey(value) {
        this.privateKey = value;
        this.dialogPageStore.privateKey = value;
    }

    setPublicKey(value) {
        this.publicKey = value;
        this.dialogPageStore.publicKey = value;
    }
}

let MainStore = new Store();

export default MainStore;
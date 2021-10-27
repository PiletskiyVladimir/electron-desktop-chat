import {makeAutoObservable} from "mobx";
import DialogInputStore from './DialogInputStore';
import {decryptMessages} from "../utils/cryptDecrypt";

class DialogPageStore {
    roomId;
    messages;
    roomObj;
    dialogInputStore;
    privateKey;
    publicKey;

    constructor() {
        this.roomId = null;
        this.messages = [];
        this.roomObj = null;
        this.dialogInputStore = new DialogInputStore();

        makeAutoObservable(this);
    }

    setRoomObj(roomObj) {
        this.roomObj = roomObj;
    }

    setRoomId (id) {
        this.roomId = id;
    }

    pushMessage (message) {
        this.messages.push(...decryptMessages([message], this.privateKey));
    }

    setMessages (messages) {
        // this.messages = messages.map(el => el.messageObj.message.join(''));
        this.messages = decryptMessages(messages, this.privateKey);
    }

    clearDialogPage() {
        this.roomId = null;
        this.messages = [];
        this.roomObj = null;
    }
}

export default DialogPageStore;
import {makeAutoObservable} from "mobx";

import SendCodeStore from "./SendCodeStore";
import RegisterStore from "./RegisterStore";
import LoginStore from "./LoginStore";
import DialogPageStore from "./DialogPageStore";

import {getUserDataApi} from "../api/user";
import {decryptMessagesFromRoomObj} from "../utils/cryptDecrypt";

import {findUsersByNickname} from '../api/mainView';

class Store {
    sendCodeStore;
    registerStore;
    loginStore;
    mainViewStore;
    dialogPageStore;

    privateKey;
    publicKey;

    userObj;

    searchPeopleInput;
    foundedUsers;

    rooms;

    constructor() {
        this.sendCodeStore      = new SendCodeStore();
        this.registerStore      = new RegisterStore();
        this.loginStore         = new LoginStore();
        this.dialogPageStore    = new DialogPageStore();
        this.privateKey         = null;
        this.publicKey          = null;
        this.userObj            = null;
        this.searchPeopleInput  = '';
        this.foundedUsers       = [];
        this.rooms = [];

        makeAutoObservable(this);
    }

    setFoundedUsers(array) {
        this.foundedUsers = array;
    }

    setRoomAndUserAndKeys(user, privateKey, publicKey, rooms) {
        this.userObj = user;
        this.privateKey = privateKey;
        this.dialogPageStore.privateKey = privateKey;
        this.publicKey = publicKey;
        this.dialogPageStore.publicKey = publicKey;
        this.setRooms(rooms);
    }

    setUser (user) {
        this.userObj = user;
    }

    updateAvatar(newAvatar) {
        this.userObj.avatar = newAvatar;
    }

    setPrivateKey(value) {
        this.privateKey = value;
        this.dialogPageStore.privateKey = value;
    }

    setPublicKey(value) {
        this.publicKey = value;
        this.dialogPageStore.publicKey = value;
    }

    changeSearchPeopleValue (value) {
        this.searchPeopleInput = value;
    }

    getRooms () {
        return this.rooms;
    }

    setRooms (rooms) {
        this.rooms = decryptMessagesFromRoomObj(rooms, this.privateKey);
    }

    updateRooms (room) {
        this.rooms = [...this.rooms, room];
    }
}

let MainStore = new Store();

export default MainStore;
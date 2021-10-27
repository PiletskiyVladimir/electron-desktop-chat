import {makeAutoObservable} from "mobx";

class DialogInputStore {
    inputValue;

    constructor() {
        this.inputValue = '';

        makeAutoObservable(this);
    }

    setInputValue (value) {
        this.inputValue = value;
    }
}

export default DialogInputStore;
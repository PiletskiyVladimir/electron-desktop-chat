import {makeAutoObservable} from "mobx";

class MainViewStore {
    rooms;

    constructor() {
        this.rooms = [];

        makeAutoObservable(this);
    }

    getRooms () {
        return this.rooms;
    }

    setRooms (rooms) {
        this.rooms = rooms;
    }

    updateRooms (room) {
        this.rooms = [...this.rooms, room];
    }
}

export default MainViewStore;
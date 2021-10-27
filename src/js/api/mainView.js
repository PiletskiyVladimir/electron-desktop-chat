import axios from "../utils/axios";

export async function getRoomsApi () {
    return await axios(null, `${process.env.BACKEND_URL}/room`, "GET", {'token': localStorage.getItem('token')});
}

export async function getRoomMessagesApi (room) {
    return [];
}
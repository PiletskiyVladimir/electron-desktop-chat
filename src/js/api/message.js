import axios from '../utils/axios';

export async function getMessagesApi(id) {
    return await axios(null, `${process.env.BACKEND_URL}/message/${id}/room`, "GET", {'token': localStorage.getItem('token')});
}

export async function createMessageApi(data) {
    return await axios(data, `${process.env.BACKEND_URL}/message`, "POST", {
        token: localStorage.getItem('token')
    });
}
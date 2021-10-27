import axios from "../utils/axios";

export async function getRoomDetailApi(id) {
    return await axios(null, `${process.env.BACKEND_URL}/room/${id}`, "GET", {
        token: localStorage.getItem('token')
    });
}
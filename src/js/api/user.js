import axios from "../utils/axios";

export async function getDataApi () {
    return await axios({}, `${process.env.BACKEND_URL}/user`, "GET", {
        token: localStorage.getItem('token')
    })
}

export async function getUserDataApi(id) {
    return await axios({}, `${process.env.BACKEND_URL}/user/${id}`, "GET", {
        token: localStorage.getItem('token')
    })
}
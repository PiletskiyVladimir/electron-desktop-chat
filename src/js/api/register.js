import Axios from "axios";

export async function registerUserApi (email, name, lastName, nickname) {
    try {
        let data = await Axios({
            method: "POST",
            url: `${process.env.BACKEND_URL}/user`,
            data: {
                email: email,
                name: name,
                lastName: lastName,
                nickname: nickname
            }
        });

        return {
            status: data.status,
            data: data.data,
            errors: null
        }
    } catch (e) {
        return {
            status: e.response.status,
            data: null,
            errors: e.response.data
        }
    }
}
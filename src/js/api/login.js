import Axios from 'axios';

export async function sendCodeApi (email) {
    try {
        let response = await Axios({
            url: `${process.env.BACKEND_URL}/auth/send-code`,
            method: "POST",
            data: {
                email: email
            }
        })

        return response.status === 200;
    } catch (e) {
        return false;
    }
}

export async function getToken () {

}
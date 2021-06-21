import axios from '../utils/axios';

export async function sendCodeApi (email) {
    return await axios({email}, `${process.env.BACKEND_URL}/auth/send-code`, "POST");
}

export async function getToken (email, code) {
    return await axios({email, code}, `${process.env.BACKEND_URL}/auth`, "POST");
}
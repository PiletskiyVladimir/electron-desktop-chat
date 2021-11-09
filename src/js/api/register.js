import axios from "../utils/axios";

export async function registerUserApi (email, name, lastName, nickname, publicKey) {
    return await axios({email, name, lastName, nickname, publicKey}, `${process.env.BACKEND_URL}/user`, "POST", {});
}
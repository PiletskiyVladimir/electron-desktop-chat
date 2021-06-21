import axios from "../utils/axios";

export async function registerUserApi (email, name, lastName, nickname) {
    return await axios({email, name, lastName, nickname}, `${process.env.BACKEND_URL}/user`, "POST");
}
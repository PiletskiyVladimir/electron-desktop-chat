import Axios from "axios";

import {apiError, apiSuccess} from "./apiReturn";

export default async function axios(data, url, method) {
    try {
        let request = await Axios({
            url: url,
            data: data,
            method: method
        })

        return apiSuccess(request);
    } catch (e) {
        return apiError(e);
    }
}
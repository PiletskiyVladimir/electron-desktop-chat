import Axios from "axios";

import {apiError, apiSuccess} from "./apiReturn";

export default async function axios(data, url, method, headers) {
    try {
        let request = await Axios({
            url: url,
            data: data,
            method: method,
            headers: headers
        })

        return [apiSuccess(request), null];
    } catch (e) {
        return [null, apiError(e)];
    }
}
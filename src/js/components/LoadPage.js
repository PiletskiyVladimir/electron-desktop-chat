import React from "react";
import MainView from "./MainView";
import SendCode from "./SendCode";

import MainStore from "../store/MainStore";

export default function LoadPage () {
    return localStorage.getItem('token') !== null ? <MainView store={MainStore}/> : <SendCode store={MainStore.sendCodeStore} />
}
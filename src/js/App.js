import React from "react";

import {HashRouter as Router, Switch, Route} from "react-router-dom";

import './app.scss';
import Settings from "./components/Settings";
import LoadPage from "./components/LoadPage";
import SendCode from "./components/SendCode";
import Register from "./components/Register";

import MainStore from "./store/MainStore";
import Login from "./components/Login";
import MainView from "./components/MainView";

export default function App () {
    return(
        <Router>
            <Switch>
                <Route path="/settings">
                    <Settings />
                </Route>
                <Route path="/send-code">
                    <SendCode store={MainStore}/>
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register store={MainStore.registerStore}/>
                </Route>
                <Route path="/main-view">
                    <MainView />
                </Route>
                <Route path="/">
                    <LoadPage />
                </Route>
            </Switch>
        </Router>
    )
}
import React from "react";

import {HashRouter as Router, Switch, Route} from "react-router-dom";

import './app.scss';
import Settings     from "./components/Settings";
import LoadPage     from "./components/LoadPage";
import SendCode     from "./components/SendCode";
import Register     from "./components/Register";
import PageNotFound from "./components/PageNotFound";
import Login        from "./components/Login";
import MainView     from "./components/MainView";
import DialogPage   from "./components/DialogPage";
import ErrorPage    from "./components/ErrorPage";

import MainStore    from "./store/MainStore";

export default function App () {
    return(
        <Router>
            <Switch>
                <Route path="/settings">
                    <Settings />
                </Route>
                <Route path="/send-code">
                    <SendCode store={MainStore.sendCodeStore}/>
                </Route>
                <Route path="/login">
                    <Login store={MainStore}/>
                </Route>
                <Route path="/register">
                    <Register store={MainStore.registerStore}/>
                </Route>
                <Route path="/main-view">
                    <MainView store={MainStore}/>
                </Route>
                <Route path="/not-found">
                    <PageNotFound />
                </Route>
                <Route path="/error">
                    <ErrorPage />
                </Route>
                <Route path="/room/:id">
                    <DialogPage store={MainStore.dialogPageStore}/>
                </Route>
                <Route path="/">
                    <LoadPage />
                </Route>
                <Route path="/people-search">

                </Route>
            </Switch>
        </Router>
    )
}
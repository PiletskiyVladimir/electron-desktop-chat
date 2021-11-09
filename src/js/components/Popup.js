import React from "react";
import {useHistory} from "react-router-dom";

export default function Popup({info, display, behaviour}) {
    let history = useHistory()
    return <div className={`over`} style={{display}}>
        <div className="over-cover">
        </div>
        <div className="popup">
            <p className={'popup-info'}>{info}</p>
            <button onClick={event => behaviour()}>OK</button>
            <div className="clear">
            </div>
        </div>
    </div>
}
import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {cryptMessage} from "../utils/cryptDecrypt";
import {createMessageApi} from "../api/message";
import {toJS} from "mobx";

async function sendMessage(store) {
    if (store.inputValue.length > 0) {
        let messageCreateObj = {
            room: store.roomId,
            messageObj: {}
        };

        for (let user of store.roomObj.users) {
            console.log(toJS(user));
            messageCreateObj.messageObj[user.id] = {message: cryptMessage(store.inputValue, user.publicKey)};
        }

        let [createdMessage, createdMessageError] = await createMessageApi(messageCreateObj);

        if (createdMessageError) history.push('/error');

        store.pushMessage(createdMessage.data);
        store.setInputValue("");
    }
}

const DialogBottom = observer(({store}) => {
    return <div className='dialog-bottom'>
        <input
            className="message-input"
            type="text"
            onChange={(e) => {
                store.setInputValue(e.target.value);
            }}
            value={store.inputValue}
            placeholder="Input your message"
            onKeyDown={
                async event => {
                    if (event.key === 'Enter') {
                        await sendMessage(store);
                    }
                }
            }
        />

        <div
            className="send-message-btn"
            onClick={
                async () => {
                    await sendMessage(store);
                }
            }
        >
            <img src="./build/assets/arrowforward.png" alt=""/>
        </div>
    </div>
});

export default DialogBottom;
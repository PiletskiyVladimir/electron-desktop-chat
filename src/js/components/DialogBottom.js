import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {cryptMessage} from "../utils/cryptDecrypt";
import {createMessageApi} from "../api/message";

async function sendMessage(store) {
    if (store.dialogInputStore.inputValue.length > 0) {
        let messageCreateObj = {
            room: store.roomId,
            messageObj: {}
        };

        for (let user of store.roomObj.users) {
            messageCreateObj.messageObj[user.id] = {message: cryptMessage(store.dialogInputStore.inputValue, user.publicKey)};
        }

        let now = Date.now();

        let [createdMessage, createdMessageError] = await createMessageApi(messageCreateObj);

        if (createdMessageError) history.push('/error');

        store.pushMessage(createdMessage.data);
        store.dialogInputStore.setInputValue("");
    }
}

const DialogBottom = observer(({store}) => {
    return <div className='dialog-bottom'>
        <input
            type="text"
            onChange={(e) => {
                store.dialogInputStore.setInputValue(e.target.value);
            }}
            value={store.dialogInputStore.inputValue}
            onKeyDown={
                async event => {
                    if (event.key === 'Enter') {
                        await sendMessage(store);
                    }
                }
            }
        />

        <button
            onClick={
                async () => {
                    await sendMessage(store);
                }
            }
        >
            send message
        </button>
    </div>
});

export default DialogBottom;
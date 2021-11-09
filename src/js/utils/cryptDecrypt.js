import JsEncrypt from "jsencrypt";
import keypair from "keypair";
import {toJS} from "mobx";

/*
    ↓↓↓↓ key pair generation example ↓↓↓↓

    (async () => {
        let pair = keypair({bits: 512});

        console.log(pair);
    })()
*/

function messageShortener(message) {
    if (message.length >= 70) {
        return message.substr(0, 70) + "...";
    } else return message;
}

export function cryptMessage(message, publicKey) {
    let crypt = new JsEncrypt();

    crypt.setPublicKey(publicKey);

    let Parts = message.match(/.{1,50}/g),
        encryptedArr = [];

    for (let el of Parts) {
        encryptedArr.push(crypt.encrypt(el));
    }

    return encryptedArr;
}

export function decryptMessagesFromRoomObj(roomArr, privateKey) {
    let crypt = new JsEncrypt();

    crypt.setPrivateKey(privateKey);

    for (let i = 0; i < roomArr.length; i++) {
        if (!roomArr[i].lastMessage) continue;
        let decryptedArr = [];

        for (let elMes of roomArr[i].lastMessage.messageObj.message) {
            decryptedArr.push(crypt.decrypt(elMes));
        }

        roomArr[i].lastMessage.messageObj.message = messageShortener(decryptedArr.join(''));
    }

    return roomArr;
}

export function decryptMessages(messageArr, privateKey) {
    let crypt = new JsEncrypt();

    crypt.setPrivateKey(privateKey);

    for (let i = 0; i < messageArr.length; i++) {
        let decryptedArr = [];

        for (let elMes of messageArr[i].messageObj.message) {
            decryptedArr.push(crypt.decrypt(elMes));
        }

        messageArr[i].messageObj.message = decryptedArr.join('');
    }

    return messageArr;
}
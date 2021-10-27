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
import React, {useRef} from 'react';
import {observer} from "mobx-react";
import {toJS} from "mobx";
import axios from "../utils/axios";
import {useHistory} from "react-router-dom";

function getFileExtension (filename) {
    return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;
}

const MainViewProfile = observer(({store}) => {
    let history = useHistory();
    let styleObj = {
        backgroundImage: store.userObj?.avatar ? "url(" + process.env.BACKEND_URL + "/" + store.userObj.avatar + ")" : "url('./build/assets/defaultAvatar.png')"
    }

    let exitBtnStyleObj = {
        backgroundImage: `url('./build/assets/exitbtn.png')`
    }

    const inputFile = useRef(null);

    return <div className="main-view-profile">
        <div
            className="exit-btn"
            style={exitBtnStyleObj}
            onClick={
                () => {
                    delete localStorage.token;
                    delete localStorage.id;

                    history.push('/send-code');
                }
            }
        >
        </div>
        <input
            type='file'
            id='file'
            ref={inputFile}
            style={{display: 'none'}}
            accept=".png, .jpg"
            onChange={
                async (event) => {
                    event.stopPropagation();
                    event.preventDefault();

                    console.log(event.target.files);

                    if (!event.target.files) return;

                    let file = event.target.files[0];

                    if (getFileExtension(file.name) !== 'png' && getFileExtension(file.name) !== 'jpeg' && getFileExtension(file.name) !== 'jpg') {
                        console.log('wrong format');
                        return;
                    }

                    let formData = new FormData();

                    formData.append("avatar", file, file.name);

                    let saveImage;

                    let [request, requestError] = await axios(
                        formData,
                        `${process.env.BACKEND_URL}/user/${store.userObj?.id}/image`,
                        "PATCH",
                        {
                            token: localStorage.getItem('token'),
                            "Content-Type": "multipart/form-data"
                        });

                    if (requestError) {
                        console.log(requestError);
                        return;
                    }

                    saveImage = request.data;

                    if (saveImage) {
                        store.updateAvatar(saveImage.avatar);
                    }
                }
            }
        />

        <div
            className="avatar"
            style={styleObj}
            onClick={
                () => {
                    inputFile.current.click();
                }
            }
        >
        </div>
        <p className="main-view-user-name">
            {store.userObj?.name + " " + store.userObj?.lastName}
        </p>

        <p
            className="main-view-profile-options"
        >
            Profile settings
        </p>

        <p
            className="main-view-profile-options"
            onClick={
                async event => {
                    let [deleteImage, deleteImageError] = await axios({}, `${process.env.BACKEND_URL}/user/${localStorage.getItem('id')}/image`, 'DELETE', {token: localStorage.getItem('token')});

                    if (deleteImageError) return history.push('/error');

                    store.userObj.avatar = null;
                }
            }
        >
            Delete profile image
        </p>
        <p
            className="main-view-profile-options"
        >
            Delete profile
        </p>
    </div>
})

export default MainViewProfile;
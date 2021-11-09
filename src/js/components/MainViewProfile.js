import React, {useRef} from 'react';
import {observer} from "mobx-react";
import {toJS} from "mobx";
import axios from "axios";
import {useHistory} from "react-router-dom";

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
            onChange={
                async (event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    let file = event.target.files[0];

                    let formData = new FormData();

                    formData.append("avatar", file, file.name);

                    let saveImage;

                    try {
                        let request = await axios({
                            method: "PATCH",
                            url: `${process.env.BACKEND_URL}/user/${store.userObj?.id}/image`,
                            headers: {
                                token: localStorage.getItem('token'),
                                "Content-Type": "multipart/form-data"
                            },
                            data: formData
                        });

                        saveImage = request.data;
                    } catch (e) {
                        saveImage = null;
                    }

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

        <p className="main-view-profile-options">
            Profile settings
        </p>

        <p className="main-view-profile-options">
            Delete profile image
        </p>
        <p className="main-view-profile-options">
            Delete profile
        </p>
    </div>
})

export default MainViewProfile;
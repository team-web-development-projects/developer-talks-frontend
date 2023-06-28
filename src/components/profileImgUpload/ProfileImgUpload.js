import React from "react";
import axios from "axios";
import { ROOT_API } from "constants/api";
import { useSelector } from "react-redux";
import { showToast } from "components/toast/showToast";
import { useEffect, useState } from "react";
import s from "./profileimgupload.module.scss";

const ProfileImgUpload = () => {
  const auth = useSelector((state) => state.authToken);
  const [profileImgData, setProfileImgData] = useState({
    id: "",
    url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    inputName: "",
  });

  useEffect(() => {
    axios
      .get(`${ROOT_API}/users/profile/image`, {
        headers: {
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then(function (response) {
        setProfileImgData({ ...profileImgData, url: response.data.url });
      });
  }, [auth.accessToken, profileImgData]);

  const handleChangeProfileImage = async (event) => {
    await new Promise((r) => setTimeout(r, 1000));

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    axios
      .put(`${ROOT_API}/users/profile/image`, formData, {
        headers: { "X-AUTH-TOKEN": auth.accessToken },
      })
      .then((response) => {
        showToast("success", "😎 정보가 수정 되었습니다");
        setProfileImgData({
          id: response.data.id,
          url: response.data.url,
          inputName: response.data.inputName,
        });
      });
  };

  return (
    <div className={s.profile}>
      <div className={s.imgwrap}>
        {profileImgData.url && <img src={profileImgData.url} alt="프로필이미지" />}
        <input accept="image/*" type="file" name="프로필이미지" onChange={handleChangeProfileImage} id="profile" />
      </div>
    </div>
  );
};

export default ProfileImgUpload;

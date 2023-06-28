import React from "react";
import { randomProfile } from "hooks/useRandomProfile";
import s from "./profileimg.module.scss";
import classnames from "classnames";
import axios from "axios";
import { useEffect, useState } from "react";
import { ROOT_API } from "constants/api";
import { useSelector } from "react-redux";
import { showToast } from "components/toast/showToast";

/**
 *
 * @param {string} size 이미지 유형 - small: 게시글, 답변등 닉네임 왼쪽에 붙기 / big: 내 프로필
 * @param {string} nickname 고유한 값, 이 값으로 랜덤 이미지 뿌려줌
 * @returns
 */

const ProfileImg = ({ size = "small", profileImgData,setProfileImgData, nickname }) => {
  const auth = useSelector((state) => state.authToken);

  useEffect(() => {
    axios
      .get(`${ROOT_API}/users/profile/image`, {
        headers: { "X-AUTH-TOKEN": auth.accessToken },
      })
      .then(function (response) {
        setProfileImgData({ ...profileImgData, url: response.data.url });
        console.log(profileImgData);
      });
  }, [auth.accessToken]);

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
    <div
      className={classnames(s.img_wrap, {
        [s.is_big]: size === "big",
      })}
    >
      {profileImgData.url ? (
        <img src={profileImgData.url} alt="프로필이미지" />
      ) : (
        <div className={s.img} dangerouslySetInnerHTML={{ __html: randomProfile(nickname) }} />
      )}
      <input accept="image/*" type="file" name="프로필이미지" onChange={handleChangeProfileImage} id="profile" />
    </div>
  );
};

export default ProfileImg;

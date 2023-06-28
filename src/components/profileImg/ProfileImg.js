import React from "react";
import { randomProfile } from "hooks/useRandomProfile";
import s from "./profileimg.module.scss";
import classnames from "classnames";
import axios from "axios";
import { useEffect, useState } from "react";
import { ROOT_API } from "constants/api";
import { useSelector } from "react-redux";

/**
 *
 * @param {string} size 이미지 유형 - small: 게시글, 답변등 닉네임 왼쪽에 붙기 / big: 내 프로필
 * @param {string} nickname 고유한 값, 이 값으로 랜덤 이미지 뿌려줌
 * @returns
 */

const ProfileImg = ({ size = "small", nickname, setImageFile, imageFile, setUserData }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const auth = useSelector((state) => state.authToken).accessToken;
  const handleChangeProfileImage = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    const imageUrl = URL.createObjectURL(file);
    setImageFile(imageUrl);
  };
  useEffect(() => {
    axios
      .get(`${ROOT_API}/users/profile/image`, {
        headers: {
          "X-AUTH-TOKEN": auth,
        },
      })
      .then(function (response) {
        setImageFile(response.data.url);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`${ROOT_API}/users/info`, {
        headers: {
          "X-AUTH-TOKEN": auth,
        },
      })
      .then(({ data }) => {
        setUserData(data);
      });
  }, [auth.accessToken]);
  
  return (
    <>
      {imageFile ? (
        <div className={s.profile}>
          <div
            className={classnames(s.img_wrap, {
              [s.is_big]: size === "big",
            })}
          >
            <img src={imageFile} alt="프로필이미지" />
            <input accept="image/*" type="file" name="프로필이미지" onChange={handleChangeProfileImage} id="profile" />
          </div>
        </div>
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: randomProfile(nickname) }}
          className={classnames(s.img_wrap, {
            [s.is_big]: size === "big",
          })}
        />
      )}
    </>
  );
};

export default ProfileImg;

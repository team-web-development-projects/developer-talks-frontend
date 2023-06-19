import React from "react";
import { randomProfile } from "hooks/useRandomProfile";
import s from "./profileimg.module.scss";
import classnames from 'classnames';

/**
 *
 * @param {string} size 이미지 유형 - small: 게시글, 답변등 닉네임 왼쪽에 붙기 / big: 내 프로필
 * @param {string} nickname 고유한 값, 이 값으로 랜덤 이미지 뿌려줌
 * @returns
 */

const ProfileImg = ({ size = "small", nickname }) => {
  return <div dangerouslySetInnerHTML={{ __html: randomProfile(nickname) }} className={classnames(s.img_wrap, {
    [s.is_big] : size === 'big'
  })} />;
};

export default ProfileImg;

import React from "react";
import s from "./title.module.scss";

const AuthTitle = ({ authlogins }) => {
  return (
    <div className={s.headername}>
      <p>{authlogins} 계정 회원가입</p>
      <span>
        Developer-Talks는 소프트웨어 개발자를 위한 지식공유 플렛폼입니다.
      </span>
    </div>
  );
};

const Title = () => {
  return (
    <p className={s.title}>
      Developer-Talks 가입으로<br/> 다양한 사람들을 만나보세요!
    </p>
  );
};

const GaiderTitle = () => {
  return (
    <div className={s.gaider}>
      <span>🙏추가 안내</span>
      <ul>
        <li>
          <span>프로필 이미지 변경</span>은 회원가입 이후에도 가능합니다.
        </li>
        <li>
          <span>디톡스</span>를 이용한 프로필 변경은 여기를 참고해주세요.
        </li>
      </ul>
    </div>
  );
};

export { Title, AuthTitle, GaiderTitle };

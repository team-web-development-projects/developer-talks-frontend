import React from "react";
import s from "./mypagecontent.module.scss";
import Userside from "./_com/userside/Userside";

const MypageContent = ({ children }) => {
  return (
    <div className={s.mypage}>
      {children}
    </div>
  );
};

export default MypageContent;

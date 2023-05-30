import React from "react";
import "./mypagecontent.scss";
import Userside from "./userside_com/Userside";

const MypageContent = ({ children }) => {
  return (
    <div className="mypage">
      <Userside />
      {children}
    </div>
  );
};

export default MypageContent;

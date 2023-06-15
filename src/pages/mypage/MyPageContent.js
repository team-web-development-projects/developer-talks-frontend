import React from "react";
import "./mypagecontent.scss";
import Userside from "./_com/userside/Userside";

const MypageContent = ({ children }) => {
  return (
    <div className="mypage">
      <Userside />
      {children}
    </div>
  );
};

export default MypageContent;

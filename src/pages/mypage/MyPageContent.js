import Userside from "components/userside/Userside";
import React from "react";
import "./mypagecontent.scss";

const MypageContent = ({ children }) => {
  return (
    <div className="mypage">
      <Userside />
      {children}
    </div>
  );
};

export default MypageContent;

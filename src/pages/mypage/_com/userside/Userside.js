import axios from "axios";
import Logout from "components/logout/Logout";
import { ROOT_API } from "constants/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Userside.scss";
import { parseJwt } from "hooks/useParseJwt";
// import ProfileImg from "components/profileImg/ProfileImg";
import Mypage from "../mypage/Mypage";
import MypageContent from "pages/mypage/MyPageContent";
import MyStudyRoom from "../mystudyroom/MyStudyRoom";
import Account from "../account/Account";
import classNames from "classnames";
import MyMessage from "../mymessage/MyMessage";
const Userside = () => {
  const auth = useSelector((state) => state.authToken).accessToken;
  const [isActive, setIsActive] = useState("mypage");
  const location = useLocation();
  // const [profileImgData, setProfileImgData] = useState({
  //   id: "",
  //   url: "",
  //   inputName: "",
  // });
  const handleClick = (value) => {
    setIsActive(value);
  };

  return (
    <MypageContent>
      <section className="side">
        <div className="imgwrap">{/* <ProfileImg size="big" /> */}</div>
        <ul className="nav">
          <li className={classNames()}></li>
          <li className={classNames("", { "is-active": isActive === "mypage" })} onClick={() => handleClick("mypage")}>
            활동내역
          </li>
          <li className={classNames("", { "is-active": isActive === "my-studyroom" })} onClick={() => handleClick("my-studyroom")}>
            스터디룸
          </li>
          <li className={classNames("", { "is-active": isActive === "my-message" })} onClick={() => handleClick("my-message")}>
            쪽지
          </li>
          <li className={classNames("", { "is-active": isActive === "account" })} onClick={() => handleClick("account")}>
            회원정보수정 및 탈퇴
          </li>
        </ul>
        <Logout />
      </section>
      <>{isActive === "mypage" && <Mypage />}</>
      <>{isActive === "my-studyroom" && <MyStudyRoom />}</>
      <>{isActive === "my-message" && <MyMessage />}</>
      <>{isActive === "account" && <Account />}</>
    </MypageContent>
  );
};

export default Userside;

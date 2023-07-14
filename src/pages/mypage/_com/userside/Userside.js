import axios from "axios";
import Logout from "components/logout/Logout";
import { ROOT_API } from "constants/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Userside.scss";
import { parseJwt } from "hooks/useParseJwt";
// import ProfileImg from "components/profileImg/ProfileImg";
import MypageContent from "pages/mypage/MyPageContent";
import MyStudyRoom from "../mystudyroom/MyStudyRoom";
import Account from "../account/Account";
import classNames from "classnames";
import MyMessage from "../mymessage/MyMessage";
import ProfileImg from "components/profileImg/ProfileImg";
import UserInfoList from "../userInfoList/UserInfoList";

const Userside = () => {
  const auth = useSelector((state) => state.authToken);
  const [isActive, setIsActive] = useState("mypage");
  const [viewSide, setViewSide] = useState(false);
  const location = useLocation();
  const [temp, setTemp] = useState(location.state && location.state.nickname);
  // const [profileImgData, setProfileImgData] = useState({
  //   id: "",
  //   url: "",
  //   inputName: "",
  // });
  const handleClick = (value) => {
    setIsActive(value);
  };

  useEffect(() => {
    // if (location.state && location.state.nickname === parseJwt(auth.accessToken).nickname) {
    if (location.state && location.state.nickname !== null) {
      if (location.state && location.state.nickname === parseJwt(auth.accessToken).nickname) {
        setViewSide(true);
      } else {
        setViewSide(false);
      }
    }
    // 
    if (location.state && location.state.nickname == null) {
      console.log("없음");
      setViewSide(true);
    }
  }, [auth.accessToken, location.state]);

  // console.log("temp", location.state && location.state.nickname);

  return (
    <MypageContent>
      {
        // 게시글을 통해 들어온 닉네임과 내 닉네임이 같을때
        ((location.state === parseJwt(auth.accessToken).nickname) ||
        // 게시글을 통해 들어오지 않을때
        (location.state === null) || 
        (viewSide)) && 
        (
        <section className="side">
          <div className="imgwrap">
            <ProfileImg size="big" />
          </div>
          <ul className="nav">
            <li
              className={classNames("", { "is-active": isActive === "mypage" })}
              onClick={() => handleClick("mypage")}
            >
              활동내역
            </li>
            <li
              className={classNames("", { "is-active": isActive === "my-studyroom" })}
              onClick={() => handleClick("my-studyroom")}
            >
              스터디룸
            </li>
            <li
              className={classNames("", { "is-active": isActive === "my-message" })}
              onClick={() => handleClick("my-message")}
            >
              쪽지
            </li>
            <li
              className={classNames("", { "is-active": isActive === "account" })}
              onClick={() => handleClick("account")}
            >
              회원정보수정 및 탈퇴
            </li>
          </ul>
          <Logout />
        </section>
      )}
      <>{isActive === "mypage" && <UserInfoList user={location.state} />}</>
      <>{isActive === "my-studyroom" && <MyStudyRoom />}</>
      <>{isActive === "my-message" && <MyMessage />}</>
      <>{isActive === "account" && <Account />}</>
    </MypageContent>
  );
};

export default Userside;

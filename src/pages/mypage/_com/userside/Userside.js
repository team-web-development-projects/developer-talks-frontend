import axios from "axios";
import Logout from "components/logout/Logout";
import { ROOT_API } from "constants/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./Userside.scss";
import { parseJwt } from "hooks/useParseJwt";
import ProfileImg from "components/profileImg/ProfileImg";

const Userside = () => {
  const auth = useSelector((state) => state.authToken).accessToken;
  const [isActive, setIsActive] = useState("mypage");
  const location = useLocation();
    const [profileImgData, setProfileImgData] = useState({
      id: "",
      url: "",
      inputName: "",
    });
  const handleClick = (value) => {
    setIsActive(value);
  };

  return (
    <>
      <section className="side">
        <div className="imgwrap">
          <ProfileImg nickname={"aa"} size="big" profileImgData={profileImgData} setProfileImgData={setProfileImgData} />
        </div>
        <ul className="nav">
          <li className={location.pathname === "/mypage" && "is-active"} onClick={() => handleClick("mypage")}>
            <Link to="/mypage">활동내역</Link>
          </li>
          <li className={location.pathname === "/my-studyroom" && "is-active"} onClick={() => handleClick("my-studyroom")}>
            <Link to="/my-studyroom">스터디룸</Link>
          </li>
          <li className={location.pathname === "/account" && "is-active"} onClick={() => handleClick("account")}>
            <Link to="/account">회원정보수정 및 탈퇴</Link>
          </li>
        </ul>
        <Logout />
      </section>
    </>
  );
};

export default Userside;

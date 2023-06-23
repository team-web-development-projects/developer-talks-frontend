import axios from "axios";
import Logout from "components/logout/Logout";
import { ROOT_API } from "constants/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./Userside.scss";
import { parseJwt } from "hooks/useParseJwt";
import ProfileImg from "components/profileImg/ProfileImg";
import Mypage from "../mypage/Mypage";
import MypageContent from "pages/mypage/MyPageContent";
import MyStudyRoom from "../mystudyroom/MyStudyRoom";
import Account from "../account/Account";

const Userside = () => {
  const auth = useSelector((state) => state.authToken).accessToken;
  const [isActive, setIsActive] = useState("mypage");
  const [imageFile, setImageFile] = useState("");
  const [userData, setUserData] = useState("");
  const location = useLocation();

  const handleClick = (value) => {
    setIsActive(value);
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

  const Menu = [
    {
      text: "활동내역",
    },
  ];

  return (
    <MypageContent>
      <section className="side">
        <div className="imgwrap">
          <ProfileImg nickname={"aa"} size="big" />
        </div>
        <ul className="nav">
          <li className={isActive === "mypage" && "is-active"} onClick={() => handleClick("mypage")}>
            활동내역
          </li>
          <li className={isActive === "my-studyroom" && "is-active"} onClick={() => handleClick("my-studyroom")}>
            스터디룸
          </li>
          <li className={isActive === "account" && "is-active"} onClick={() => handleClick("account")}>
            회원정보수정 및 탈퇴
          </li>
        </ul>
        <Logout />
      </section>
      <>{isActive === "mypage" && <Mypage />}</>
      <>{isActive === "my-studyroom" && <MyStudyRoom />}</>
      <>{isActive === "account" && <Account />}</>
    </MypageContent>
  );
};

export default Userside;

import axios from "axios";
import Logout from "components/logout/Logout";
import { ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./Userside.scss";

const Userside = () => {
  const auth = useSelector((state) => state.authToken).accessToken;
  const [isActive, setIsActive] = useState("mypage");
  const [imageFile, setImageFile] = useState("");
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
  };

  const handleClick = (value) => {
    setIsActive(value);
  };

  const userinfo = parseJwt(auth);
  useEffect(() => {
    axios
      .get(`${ROOT_API}/users/profile/image`, {
        headers: {
          "X-AUTH-TOKEN": auth,
        },
      })
      .then(function (response) {
        console.log("정보 성공:", response);
        setImageFile(response.data.url);
      })
      .catch(function (error) {
        console.log("정보:실패 ", error.response);
      });
  }, [auth.accessToken]);

  return (
    <>
      <section className="sidebackground"></section>
      <section className="side">
        <div className="imgwrap">
          <img src={imageFile} alt="" />
          <input type="file" name="" id="" />
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

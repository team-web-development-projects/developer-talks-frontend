import { Link } from "react-router-dom";
import axios from "axios";
import Logout from "components/logout/Logout";
import { ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import { useSelector } from "react-redux";
import "./Userside.scss";
import { useState } from "react";

const Userside = () => {
  const [isActive, setIsActive] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
  };
  const handleClick = () => {
    setIsActive(!isActive);
  };

  const auth = useSelector((state) => state.authToken).accessToken;
  const userinfo = parseJwt(auth);

  const changeProfileImg = (e) => {
    if (e.target.files) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      axios
        .post(`${ROOT_API}/users/profile/image`, formData, {
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
            "X-AUTH-TOKEN": auth.accessToken,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <section className="sidebackground"></section>
      <section className="side">
        <div className="imgwrap">
          <img src={imageFile} alt="" />
          <input type="file" name="" id="" onChange={changeProfileImg} />
        </div>
        <p>{userinfo.nickname} 님 </p>
        <ul>
          {/* <li>
            <Link to="/introduction" className={isActive ? 'active' : ''} onClick={handleClick}>🎆 내소개</Link>
          </li> */}
          <li>
            <Link
              to="/mypage"
              className={isActive ? "active" : ""}
              onClick={handleClick}
            >
              🧥 활동내역
            </Link>
          </li>
          <li>
            <Link
              to="/my-studyroom"
              className={isActive ? "active" : ""}
              onClick={handleClick}
            >
              스터디룸
            </Link>
          </li>
          <li>
            <Link
              to="/account"
              className={isActive ? "active" : ""}
              onClick={handleClick}
            >
              🐹 회원정보수정 및 탈퇴
            </Link>
          </li>
          <li>
            <Logout />
          </li>
        </ul>
      </section>
    </>
  );
};

export default Userside;

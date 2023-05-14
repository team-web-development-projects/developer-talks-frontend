import { Link } from "react-router-dom";
import loginuser from "./loginuser.jpg";
// import user from './user.jpg';
import "./Left.scss";
import Logout from "components/logout/Logout";
import { useSelector } from "react-redux";
import { parseJwt } from "hooks/useParseJwt";

const Left = () => {
  const auth = useSelector((state) => state.authToken).accessToken;
  const userinfo = parseJwt(auth);
  const line = "유저소개 글 인사말";

  return (
    <>
      <section className="side">
        <img src={loginuser} alt="" />
        <p>{userinfo.nickname} 님 </p>
        <p>{line}</p>
        <ul>
          <li>
            <Link to="/mypage">활동내역</Link>
          </li>
          <li>
            <Link to="/account">회원정보수정 및 탈퇴</Link>
          </li>
          <li></li>
        </ul>
        <Logout />
      </section>
    </>
  );
};

export default Left;

import { Link } from 'react-router-dom';
import loginuser from './loginuser.jpg';
// import user from './user.jpg';
import './Left.scss';
import Logout from 'components/logout/Logout';
import { useSelector } from 'react-redux';
import { parseJwt } from 'hooks/useParseJwt';

const Left = () => {
  const auth = useSelector((state) => state.authToken).accessToken;
  const userinfo = parseJwt(auth);
  const line = '내 소개';

  return (
    <>
      <section className="side">
        <img src={loginuser} alt="" />
        <p>{userinfo.nickname} 님 </p>
        {/* <p>{line}</p> */}
        <ul>
          <li>
            <Link to="/introduction">{line}</Link>
          </li>
          <li>
            <Link to="/mypage">활동내역</Link>
          </li>
          <li>
            <Link to="/account">회원정보수정 및 탈퇴</Link>
          </li>
        </ul>
        <Logout />
      </section>
    </>
  );
};

export default Left;

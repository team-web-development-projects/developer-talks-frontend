import { Link } from 'react-router-dom';
import loginuser from './loginuser.jpg';
// import user from './user.jpg';
import './Left.scss';
import Logout from 'pages/logout/Logout';

const Left = () => {
  const name = '유저네임';
  const line = '유저소개 글 인사말';
  return (
    <>
      <section className="side">
        <img src={loginuser} alt="" />
        <p>{name}</p>
        <p>{line}</p>
        <ul>
          <li>
            <Link to="/mypage">활동내역</Link>
          </li>
          <li>
            <Link to="/account">회원정보</Link>
          </li>
          <li>
            <Logout />
          </li>
        </ul>
      </section>
    </>
  );
};

export default Left;

import { Link } from 'react-router-dom';
import loginuser from './loginuser.jpg';
// import user from './user.jpg';
import './Left.scss';
import Logout from 'pages/logout/Logout';

const Left = () => {
  const name = '유저네임';
  const line = '유저소개 글 인사말';

  // // 'http://localhost:3000/?accessToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJydWR3bm9rQGdtYWlsLmNvbSIsInVzZXJpZCI6InJ1ZHdub2tAZ21haWwuY29tIiwibmlja25hbWUiOiLqsr0iLCJpYXQiOjE2ODM5NzYzMjcsImV4cCI6MTY4Mzk4NzEyN30.EnqcRjKM1oLaACljmE2WZnv7HhK9MRnjEUW6rH-nglk&refreshToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJydWR3bm9rQGdtYWlsLmNvbSIsInVzZXJpZCI6InJ1ZHdub2tAZ21haWwuY29tIiwibmlja25hbWUiOiLqsr0iLCJpYXQiOjE2ODM5NzYzMjcsImV4cCI6MTY4NDA2MjcyN30.QRf8m9LwTS9gSTi1ibo3cfWfW4w3MGWlq_xv3ElbS_E';
  // {
  //   "alg": "HS256"
  // }

  // {
  //   "sub": "rudwnok@gmail.com",
  //   "userid": "rudwnok@gmail.com",
  //   "nickname": "경",
  //   "iat": 1683976327,
  //   "exp": 1683987127
  // }
  // HMACSHA256 (
  //   base64UrlEncode(헤더) + "." +
  //   base64UrlEncode(페이로드),

  // your-256-bit-secret

  // )
  // email: data.userEmail,
  // nickname: data.userNickname,
  // userid: data.userId,
  // password: data.password,

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
            <Link to="/account">회원정보수정 및 탈퇴</Link>
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

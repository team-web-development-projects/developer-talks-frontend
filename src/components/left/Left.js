import { Link } from 'react-router-dom';
import './Left.scss';

const Left = () => {
  const name = '유저네임';
  const line = '유저소개 글 인사말';
  return (
    <>
      <section className="side">
        <img src="user.jpg" alt="" />
        <p>{name}</p>
        <p>{line}</p>
        <ul>
          <li>
            <Link>활동내역</Link>
          </li>
          <li>
            <Link>회원정보</Link>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Left;

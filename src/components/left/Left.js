import { Link } from 'react-router-dom';
import './Left.scss';

const Left = () => {
  return (
    <>
      <section className="side">
        <img src="./image/free-icon-dog-3640171.png" alt="" />
        <p>계정 이름</p>
        <p>계정 소개</p>
        <ul>
          <li>
            <Link>개인 노트 페이지</Link>
          </li>
          <li>
            <Link>개인정보</Link>
          </li>
          <li>
            <Link>로그인 및 보안</Link>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Left;

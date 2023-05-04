import { useEffect, useState } from 'react';
// import { BsHouse } from "react-icons/bs";
import { FiMenu } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import './header.scss';

// alt + shiff + o
const Header = () => {
  const [header, setHeader] = useState('false');
  // [읽기, 쓰기] = useState('초기값') // 초기값 타입 : string, number ,array, json, boolean(true, false)

  // return dom 그려질때. 추적하는 상태가 바뀔때.
  useEffect(() => {
    setHeader('👩🏻‍🦰');
    // NOTE 로그인 이모지
    console.log('header State', header);
  }, [header]);

  return (
    <header className="header">
      {/* <button onClick={() => setHeader('true')}>클릭</button> */}
      <div className="logo">
        <Link to="/">Developer-Talks</Link>
      </div>
      <nav className="navBar">
        <ul className="right">
          <li>
            <Link to="/board/main">Q&A</Link>
          </li>
          <li>
            <Link to="/">커뮤니티</Link>
          </li>
          <li>
            <Link to="/">스터디공간</Link>
          </li>
          <li>
            <Link to="/">공지사항</Link>
          </li>
          <li>
            <Link to="/">
              <p>🔔</p>
            </Link>
          </li>
          <li>
            <Link to="/mypage">
              <p>{header && header}</p>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="menuBar">
        <Link to="/">
          <FiMenu size={24} />
        </Link>
      </div>
    </header>
  );
};
export default Header;

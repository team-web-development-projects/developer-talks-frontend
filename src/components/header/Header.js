import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.scss';
import { useSelector } from 'react-redux';
import { BsHouse } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';

const Header = () => {
  const [header, setHeader] = useState(false);
  useEffect(() => {
    setHeader('👩🏻‍🦰');
    // NOTE 로그인 이모지
  }, []);

  const location = useLocation();
  const auth = useSelector((state) => state.authToken);
  console.log('auth:', auth);

  return (
    <header className="header">
      <div className="headerBox">
        <ul>
          <li>
            <Link to="/">
              <p>게시판 홈</p>
              <p>
                <BsHouse size={24} />
              </p>
            </Link>
          </li>
        </ul>
        <nav>
          <ul className="right">
            <li>
              <Link to="/">Q&A</Link>
            </li>

            <li>
              <Link to="/">커뮤니티</Link>
            </li>

            <li>
              <Link to="/">공지사항</Link>
            </li>
            <li>
              <Link to="/">{header && header}</Link>
            </li>
            <li>
              <Link to="/">
                <FiMenu size={24} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <h1>
        <Link to="/individual">Developer-Talks</Link>
      </h1>
      <Link
        to="/login"
        className={classNames('', {
          'is-active': location.pathname === '/login',
        })}
      >
        로그인
      </Link>
      {' | '}
      <Link
        to="/regist"
        className={classNames('', {
          'is-active': location.pathname === '/regist',
        })}
      >
        회원가입
      </Link>
    </header>
  );
};
export default Header;
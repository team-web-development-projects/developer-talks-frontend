import classNames from 'classnames';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.scss';
import { useSelector } from 'react-redux';

const Header = () => {
  const location = useLocation();
  const auth = useSelector((state) => state.authToken);
  console.log('auth:', auth);

  return (
    <header className="header">
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

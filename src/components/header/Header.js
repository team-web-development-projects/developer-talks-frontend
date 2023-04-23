import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './header.scss';

const HeaderStyle = styled.header`
  color: red;
`;

const Header = () => {
  return (
    <HeaderStyle>
      <h1>
        {/* NOTE: asdfasdf */}
        {/* TODO: asdfasdf */}
        {/* FIXME : asdfasdf */}

        <Link to="/">Developer-Talks</Link>
      </h1>
      <Link to="/login">로그인 |</Link> <Link to="/regist">회원가입</Link>
    </HeaderStyle>
  );
};
export default Header;

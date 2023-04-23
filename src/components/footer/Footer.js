import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './Footer.scss';

const FooterStyle = styled.footer;

const Footer = () => {
  return (
    <FooterStyle>
      <ul class="foot">
        <li>비밀번호찾기</li>
        <li>|</li>
        <li>아이디 찾기</li>
        <li>|</li>
        <li>
          <Link to="/">회원가입</Link>
        </li>
      </ul>
      <p class="foot_2">© Developer-Talks.</p>
    </FooterStyle>
  );
};

export default Footer;

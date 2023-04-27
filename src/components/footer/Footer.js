import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <ul className="foot">
        <li>비밀번호찾기</li>
        <li>|</li>
        <li>아이디 찾기</li>
      </ul>
      <p className="copy">© Developer-Talks.</p>
    </footer>
  );
};

export default Footer;

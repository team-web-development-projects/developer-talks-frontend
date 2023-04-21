import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
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
    </>
  );
};

export default Footer;

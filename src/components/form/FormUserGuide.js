import React from "react";
import "./form.scss";
import { Link, useLocation } from "react-router-dom";

const FormUserGuide = () => {
  const location = useLocation();

  return (
    <>
      <ul className="form-user-guide">
        {location.pathname === "/login" && (
          <>
            <li>
              <Link to="/finduser">아이디 찾기</Link>
            </li>
            <li>|</li>
            <li>비밀번호 찾기</li>
            <li>|</li>
            <li>
              <Link to="/regist">회원가입 하기</Link>
            </li>
          </>
        )}
        {location.pathname === "/regist" && (
          <>
            <li>로그인</li>
          </>
        )}
      </ul>
    </>
  );
};

export default FormUserGuide;
import classNames from "classnames";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.scss";

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>
        <Link to="/">Developer-Talks</Link>
      </h1>
      <Link
        to="/login"
        className={classNames("", {
          "is-active": location.pathname === "/login",
        })}
      >
        로그인
      </Link>
      {" | "}
      <Link
        to="/regist"
        className={classNames("", {
          "is-active": location.pathname === "/regist",
        })}
      >
        회원가입
      </Link>
    </header>
  );
};
export default Header;

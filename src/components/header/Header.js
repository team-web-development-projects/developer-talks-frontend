import classNames from "classnames";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.scss";
import { useSelector } from "react-redux";

const Header = () => {

  return (
    <header className="header">
      <div className="left">
        <h1>
          <Link to="/">Developer-Talks</Link>
        </h1>
        <ul>
          <li>
            <Link to="/community">커뮤니티</Link>
          </li>
          <li>
            <Link to="/qna">Q&A</Link>
          </li>
          <li>
            <Link to="/study">스터디 공간</Link>
          </li>
        </ul>
      </div>
      <div className="search">
        <input type="search" name="" id="" placeholder="검색" />
      </div>
      <div className="user">
        <Link to="/mypage">마이페이지</Link>
      </div>
    </header>
  );
};
export default Header;

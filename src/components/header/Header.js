import classNames from "classnames";
import { useEffect, useState } from "react";
import { BsHouse } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./header.scss";

// alt + shiff + o 
const Header = () => {
  const [header, setHeader] = useState('false');
  // [읽기, 쓰기] = useState('초기값') // 초기값 타입 : string, number ,array, json, boolean(true, false)


  // return dom 그려질때. 추적하는 상태가 바뀔때.  
  useEffect(() => {
    setHeader("👩🏻‍🦰");
    // NOTE 로그인 이모지
    console.log("header State", header);
  }, [header]);

  const location = useLocation();
  const auth = useSelector((state) => state.authToken);
  console.log("auth:", auth);

  return (
    <header className="header">
      <button onClick={() => setHeader('true')}>클릭</button>

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
              <Link to="/board/list">Q&A</Link>
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
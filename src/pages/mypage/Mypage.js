import classNames from 'classnames';
import Left from 'components/left/Left';
import { useSelector } from 'react-redux';
import { Children, useState } from 'react';
import './Mypage.scss';

// import { Link, useLocation } from "react-router-dom";

const Mypage = () => {
  // const location = useLocation();
  const auth = useSelector((state) => state.authToken);
  console.log('auth:', auth);

  const contacts = [
    { id: 0, type: '최근활동', line: '안녕' },
    { id: 1, type: '내가 쓴 글', line: '안녕' },
    { id: 2, type: '댓글', line: '안녕' },
    { id: 3, type: '스크랩', line: '안녕' },
  ];
  const [select, setSelect] = useState('');
  const onSelect = (type) => {
    setSelect(type);
  };

  return (
    <main className="main">
      {/* <Link
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
      </Link> */}
      <Left />

      <section className="notes">
        <ul>
          {contacts.map((contact) => (
            <li>
              <button
                key={contact.id}
                onClick={() => onSelect(contact.type)}
                className={`${select === contact.type ? 'select' : ''}`}
              >
                {contact.type}
              </button>
              <p className={`${select === contact.type ? 'selects' : ''}`}>
                {contact.line}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Mypage;

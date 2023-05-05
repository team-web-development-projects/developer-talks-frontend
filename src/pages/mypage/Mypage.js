import classNames from 'classnames';
import Left from 'components/left/Left';
import { useSelector } from 'react-redux';
import { Children, useState } from 'react';
import './Mypage.scss';

import { Link, useLocation } from 'react-router-dom';

const Mypage = ({ user }) => {
  const location = useLocation();
  const auth = useSelector((state) => state.authToken);
  console.log('auth:', auth);

  const contacts = [
    { id: 0, type: '최근활동', line: '최근 활동 리스트들' },
    { id: 1, type: '내가 쓴 글', line: '최근 내가 쓴 글들' },
    { id: 2, type: '댓글', line: '최근 댓글' },
    { id: 3, type: '스크랩', line: '스크랩 한 글들' },
  ];
  const [select, setSelect] = useState('');
  const onSelect = (type) => {
    setSelect(type);
  };

  const LoginRegist = () => {
    <>
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
    </>;
  };

  return (
    <main className="main">
      {{ user } ? '로그아웃' : <LoginRegist />}

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
              {/* FIXME 이건 버튼 클릭 시 색 변경까진 했는데, 클릭하고 내용이 나왔으면하는데, 모든 내용이 한 번에 다 나오네요..하다 보니 난리 났네요. 문제점 마구 알려주세요! */}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Mypage;

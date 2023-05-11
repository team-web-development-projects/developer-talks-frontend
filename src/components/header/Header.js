import { useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { AiFillBell } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import './header.scss';
import useHistory from 'hooks/useHistory';
// import AlertModal from 'components/portalModal/AlertModal';
// import { Children } from 'react';
// import List from 'components/list/List';

// const User = (user) => {
//   user.title(user.amount);
// };
// alt + shiff + o
const Header = () => {
  const history = useHistory;
  // const history = useHistory;
  const [popover, setPopover] = useState(false);
  const [header, setHeader] = useState('false');
  const showPopover = () => {
    setPopover(!popover);
  };
  history.listen((location, action) => {
    setPopover(false);
  });
  // const location = useLocation();

  // useEffect(() => {
  //   console.log(location);
  // }, [location]);

  let [user, setUser] = useState([
    {
      id: '1',
      amount: 'test1',
      data: '사랑의 앞이 튼튼하며, 거친 사막이다. 청춘의 보배를 기쁘며, 날카로우나 구하지 하여도 그러므로 뿐이다. 이상 무엇을 목숨을 그들에게 천하를 능히 위하여, 그들은 듣기만 부패뿐이다. 내는 오직 실로 두손을 봄바람이다. 어디 무엇이 소금이라 있으며, 예가 기관과 인류의 뿐이다. 풀이 청춘의 지혜는 창공에 인간은 때까지 봄바람이다. 인류의 피는 주며, 자신과 쓸쓸하랴? 돋고, 그들의 것은 위하여, 그와 위하여서. 수 웅대한 설레는 피가 청춘이 피고, 것이다. 이는 이상이 구하기 생생하며, 천하를 운다.',
      nickname: 'Ann',
    },
    {
      id: '2',
      amount: 'test2',
      data: 'bbbbbbbbbbbbbbb',
      nickname: 'Tree',
    },
    {
      id: '3',
      amount: 'test3',
      data: 'ccccccccccccccccccccc',
      nickname: 'Lotto',
    },
  ]);

  // const UserList = users.map((user) => <User />);

  // [읽기, 쓰기] = useState('초기값') // 초기값 타입 : string, number ,array, json, boolean(true, false)

  // return dom 그려질때. 추적하는 상태가 바뀔때.
  useEffect(() => {
    setHeader('👩🏻‍🦰');
    // NOTE 로그인 이모지
    console.log('header State', header);
  }, [header]);

  return (
    <header className="header">
      {/* <button onClick={() => setHeader('true')}>클릭</button> */}
      <div className="logo">
        <Link to="/">Developer-Talks</Link>
      </div>
      <nav className="navBar">
        <ul className="right">
          <li>
            <Link to="/qna/list">Q&A</Link>
          </li>
          <li>
            <Link to="/board/list">커뮤니티</Link>
          </li>
          <li>
            <Link to="/">스터디공간</Link>
          </li>
          <li>
            <Link to="/">공지사항</Link>
          </li>

          <li className="popover-link">
            <span onClick={showPopover}>
              <span className="bell">
                <AiFillBell size={24} color="#2f92ff" />
              </span>
              {popover && (
                <div className="popover">
                  {user.map((item, index) => (
                    <div key={index}>{item.nickname}</div>
                  ))}
                </div>
              )}
            </span>
            {
              //   popover &&
              //   user.map((a, index) {
              //     return <div key={a.id}>{a.amount}</div>;
              // })
            }
            {/* FIXME Key도 넣었는데 이게 왜 오류가 날까요? */}
          </li>
          <li>
            <Link to="/mypage">
              <span>{header && header}</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="menuBar">
        <Link to="/">
          <FiMenu size={24} />
        </Link>
      </div>
    </header>
  );
};
export default Header;

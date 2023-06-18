import { useEffect, useState, useRef } from "react";
import { FiMenu } from "react-icons/fi";
import { AiFillBell } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import "./header.scss";
import { parseJwt } from "hooks/useParseJwt";
import { ROOT_API } from "constants/api";
import { outOfClick } from "hooks/useOutOfClick";

const Header = () => {
  const auth = useSelector((state) => state.authToken);
  const [popover, setPopover] = useState(false);
  const [userhi, setUserhi] = useState(false);
  let nickname = "";
  const targetRef = useRef(null);
  outOfClick(targetRef);


  const showPopover = () => {
    setPopover(!popover);
  };
  const location = useLocation(); //url 정보 들어 있음.

  if (auth.accessToken !== null) {
    nickname = parseJwt(auth.accessToken).nickname;
  }
  useEffect(() => {
    if (auth.accessToken == null) {
      setUserhi(false);
    } else {
      setUserhi(true);
    }
  }, [auth.accessToken]);

  useEffect(() => {
    setPopover(false);
  }, [location]);
  // useEffect 훅을 사용하여, location 값이 변경될 때마다 popover 상태를 false로 업데이트
  // []한번 실행
  let [user, setUser] = useState([
    {
      id: "1",
      nickname: "Ann",
    },
    {
      id: "2",
      nickname: "Tree",
    },
    {
      id: "3",
      nickname: "Lotto",
    },
  ]);

  async function fetchProjects() {
    const { data } = await axios.get(`${ROOT_API}/post/list/user/${nickname}`, {
      // params: { page: currentPage - 1, size: 10 },
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": auth.accessToken,
      },
    });
    return data;
  }

  const { status, data, error, isFetching, isPreviousData, isLoading } =
    useQuery({
      queryKey: ["popover"],
      // queryFn: () => fetchProjects(),
      // suspense: true,
    });

  if (isLoading) return <div>Loading...</div>;
  if (status === "loading") return <div>Loading...</div>;

  // const UserList = users.map((user) => <User />);

  // [읽기, 쓰기] = useState('초기값') // 초기값 타입 : string, number ,array, json, boolean(true, false)

  return (
    <header className="header">
      {/* <button onClick={() => setHeader('true')}>클릭</button> */}
      <div className="logo">
        <Link to="/"> Developer-Talks</Link>
      </div>
      <nav className="navBar">
        <ul className="right">
          <li>
            <Link to="/qna">Q&A</Link>
          </li>
          <li>
            <Link to="/board">커뮤니티</Link>
          </li>
          <li>
            <Link to="/studyroom">스터디공간</Link>
          </li>

          <li className="popover-link">
            <span onClick={showPopover} ref={targetRef}>
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
          </li>
          <li className="header-user">
            <Link to="/mypage">
              <BsFillPersonFill size={24} />
            </Link>
            {nickname && <span>{`${nickname}님`}</span>}
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

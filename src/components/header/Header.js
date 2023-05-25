import { useEffect, useState } from "react";
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

const Header = () => {
  const auth = useSelector((state) => state.authToken);
  const [popover, setPopover] = useState(false);
  const [userhi, setUserhi] = useState(false);
  let nickname = "";
  const showPopover = () => {
    setPopover(!popover);
  };
  const location = useLocation(); //url 정보 들어 있음.

  console.log("auth", auth);
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
      amount: "test1",
      data: "사랑의 앞이 튼튼하며, 거친 사막이다. 청춘의 보배를 기쁘며, 날카로우나 구하지 하여도 그러므로 뿐이다. 이상 무엇을 목숨을 그들에게 천하를 능히 위하여, 그들은 듣기만 부패뿐이다. 내는 오직 실로 두손을 봄바람이다. 어디 무엇이 소금이라 있으며, 예가 기관과 인류의 뿐이다. 풀이 청춘의 지혜는 창공에 인간은 때까지 봄바람이다. 인류의 피는 주며, 자신과 쓸쓸하랴? 돋고, 그들의 것은 위하여, 그와 위하여서. 수 웅대한 설레는 피가 청춘이 피고, 것이다. 이는 이상이 구하기 생생하며, 천하를 운다.",
      nickname: "Ann",
    },
    {
      id: "2",
      amount: "test2",
      data: "bbbbbbbbbbbbbbb",
      nickname: "Tree",
    },
    {
      id: "3",
      amount: "test3",
      data: "ccccccccccccccccccccc",
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

  console.log("data", data);

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
          </li>
          <li className="header-user">
            <Link to="/mypage">
              {userhi ? (
                <>
                  <BsFillPersonFill size={24} />
                </>
              ) : (
                <span>{"로그인"}</span>
              )}
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

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
import classNames from "classnames";

const Header = () => {
  const auth = useSelector((state) => state.authToken);
  const [popover, setPopover] = useState(false);
  let nickname = "";
  const targetRef = useRef(null);
  const location = useLocation();
  // outOfClick(targetRef); // NOTE: 아웃오브클릭 테스트

  const showPopover = () => {
    setPopover(!popover);
  };

  if (auth.accessToken !== null) {
    nickname = parseJwt(auth.accessToken).nickname;
  }

  useEffect(() => {
    setPopover(false);
  }, [location]);

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

  const { status, data, error, isFetching, isPreviousData, isLoading } = useQuery({
    queryKey: ["popover"],
    // queryFn: () => fetchProjects(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (status === "loading") return <div>Loading...</div>;

  const menuRouter = [
    {
      link: "/qna",
      text: "Q&A",
    },
    {
      link: "/board",
      text: "커뮤니티",
    },
    {
      link: "/studyroom",
      text: "스터디룸",
    },
  ];

  return (
    <header className="header">
      <div className="header-wrap">
        <Link className="logo" to="/">
          Developer-Talks
        </Link>
        <nav className="navBar">
          <ul className="right">
            {menuRouter.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.link}
                  className={classNames("", {
                    "is-active": location.pathname.includes(item.link),
                  })}
                >
                  {item.text}
                </Link>
              </li>
            ))}
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
            </li>
            <li className="header-user">
              <Link to="/mypage">
                {location.pathname === "/mypage" ? (
                  <BsFillPersonFill size={24} color="#2f92ff" />
                ) : (
                  <BsFillPersonFill size={24} />
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
      </div>
    </header>
  );
};
export default Header;

import classNames from "classnames";
import Notification from "components/noti/Notification";
import { parseJwt } from "hooks/useParseJwt";
import { useEffect, useRef, useState } from "react";
import { AiFillBell } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./header.scss";
import ProfileImg from "components/profileImg/ProfileImg";

const Header = () => {
  const auth = useSelector((state) => state.authToken);
  const [popover, setPopover] = useState(false);
  let nickname = "";
  const targetRef = useRef(null);
  const location = useLocation();
      const [profileImgData, setProfileImgData] = useState({
        id: "",
        url: "",
        inputName: "",
      });
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
                {popover && <Notification />}
              </span>
            </li>
            <li className="header-user">
              <Link to="/mypage">
                {location.pathname === "/mypage" ? (
                  <ProfileImg nickname={"aa"} profileImgData={profileImgData} setProfileImgData={setProfileImgData} border="color" />
                ) : (
                  <ProfileImg nickname={"aa"} profileImgData={profileImgData} setProfileImgData={setProfileImgData} />
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

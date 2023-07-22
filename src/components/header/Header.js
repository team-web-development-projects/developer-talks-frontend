import classNames from "classnames";
import Notification from "components/noti/Notification";
import ProfileImg from "components/profileImg/ProfileImg";
import { parseJwt } from "hooks/useParseJwt";
import { useEffect, useRef, useState } from "react";
import { TfiBell } from "react-icons/tfi";
import { BsFillPersonFill } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./header.scss";
import { useOutOfClick } from "hooks/useOutOfClick";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  const auth = useSelector((state) => state.authToken);
  const noti = useSelector((state) => state.notification);
  // const noti = useSelector((state) => state.noti);
  const [popover, setPopover] = useState(false);
  let nickname = "";
  const targetRef = useRef(null);
  const location = useLocation();
  const [toggleShow, setToggleShow] = useState(false);
    useEffect(() => {
      setToggleShow(false);
    }, [location]);
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

  useOutOfClick(targetRef, () => {
    setPopover(false);
  });
  const visible = () => {
    setToggleShow(!toggleShow);
  };
  // console.log('헤더 노티 : ', noti)

  return (
    <header className="header">
      <Link className="logo" to="/">
        Developer-Talks
      </Link>
      <ul className={`navBar ${toggleShow ? "open" : "notOpen"}`}>
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
      </ul>
      <ul className="menuBar">
        <li className="popover-link">
          <span onClick={showPopover} ref={targetRef}>
            <span className="bell">
              {/* TODO: 알람이 있을때 표시하기 */}
              {noti.noti && auth.accessToken !== null && <span className="point" />}
              <TfiBell size={24} />
            </span>
            <Notification classname={popover ? "is_show" : ""} />
          </span>
        </li>
        <li className="header-user">
          <Link to="/showuser">{!nickname ? <BsFillPersonFill size={24} /> : <ProfileImg border="color" type="header" />}</Link>
          {nickname && <span>{`${nickname}님`}</span>}
        </li>
        <li className="display">
          <AiOutlineMenu size={26} onClick={visible} className={`${toggleShow ? "showMenu" : "notShowMenu"}`} />
        </li>
      </ul>
    </header>
  );
};
export default Header;

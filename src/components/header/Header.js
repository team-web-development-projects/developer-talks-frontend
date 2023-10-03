import { getUserInfoApi } from "api/auth";
import classNames from "classnames";
import Notification from "components/noti/Notification";
import ProfileImg from "components/profileImg/ProfileImg";
import { useOutOfClick } from "hooks/useOutOfClick";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { TfiBell } from "react-icons/tfi";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./header.scss";
import { SET_USER_INFO } from "store/User";
import { SET_PAGING } from "store/PagiNation";

const Header = () => {
  const auth = useSelector((state) => state.authToken);
  const user = useSelector((state) => state.userStore);
  const noti = useSelector((state) => state.notification);
  const pageNumber = useSelector((state) => state.paginationStore);
  // const noti = useSelector((state) => state.noti);
  const dispatch = useDispatch();
  const [popover, setPopover] = useState(false);
  const targetRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [toggleShow, setToggleShow] = useState(false);

  useEffect(() => {
    setToggleShow(false);
    setPopover(false);
  }, [location]);

  const showPopover = () => {
    setPopover(!popover);
  };

  const menuRouter = [
    {
      link: "/questions",
      text: "Q&A",
    },
    {
      link: "/post",
      text: "커뮤니티",
    },
    {
      link: "/study-rooms",
      text: "스터디룸",
    },
    // {
    //   link: "/notice",
    //   text: "공지사항",
    // },
  ];

  useOutOfClick(targetRef, () => {
    setPopover(false);
  });
  const visible = () => {
    setToggleShow(!toggleShow);
  };

  const { data, isSuccess } = useQuery({
    queryKey: [auth],
    queryFn: () => getUserInfoApi(),
    enabled: auth.accessToken !== null,
  });

  useEffect(() => {
    if (isSuccess && user.nickname === "") {
      dispatch(SET_USER_INFO({ nickname: data.nickname }));
    }
  }, [user.nickname, isSuccess, dispatch]);

  const goMypage = () => {
    // navigate(`/user/activity/${data.nickname}`);
  };

  return (
    <>
      <div className={`${toggleShow && "mobile_wrap"}`}></div>
      <header className="header">
        <div className="header-wrap">
          <Link className="logo" to="/">
            Developer-Talks
          </Link>
          <nav>
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
                    {/* TODO: 알람이 있을때 표시하기 */}
                    {noti.noti && auth.accessToken !== null && <span className="point" />}
                    <TfiBell size={24} />
                  </span>
                  <Notification classname={popover ? "is_show" : ""} />
                </span>
              </li>
              <li className="header-user">
                <Link to="/user">
                  {data && data.nickname ? <ProfileImg border="color" type="header" /> : <BsFillPersonFill size={24} />}
                </Link>
                {data && data.nickname && <span>{`${data.nickname}님`}</span>}
              </li>
            </ul>
          </nav>
          <div onClick={visible} className={`mobile-menu ${toggleShow ? "is-show" : false}`}>
            {toggleShow ? <AiOutlineClose size={24} /> : <FiMenu size={24} />}
          </div>
        </div>

        <div className={`mobile-nav ${toggleShow ? "is-open" : false}`}>
          <div className="header-user">
            <Link to="/user">
              {data && data.nickname ? (
                <ProfileImg border="color" type="header" className="profile" />
              ) : (
                <BsFillPersonFill size={24} />
              )}
            </Link>
            {data && data.nickname && <span>{`${data.nickname}님`}</span>}
          </div>
          <ul>
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
        </div>
      </header>
    </>
  );
};
export default Header;

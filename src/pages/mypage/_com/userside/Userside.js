import Logout from "components/logout/Logout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./Userside.scss";
// import ProfileImg from "components/profileImg/ProfileImg";
import classNames from "classnames";
import ProfileImg from "components/profileImg/ProfileImg";
import MypageContent from "pages/mypage/MyPageContent";
import Account from "../account/Account";
import MyMessage from "../mymessage/MyMessage";
import MyStudyRoom from "../mystudyroom/MyStudyRoom";
import UserInfoList from "../userInfoList/UserInfoList";

const Userside = () => {
  const nickname = useSelector((state) => state.userStore.nickname);
  const [isActive, setIsActive] = useState("mypage");
  const [viewSide, setViewSide] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // const [profileImgData, setProfileImgData] = useState({
  //   id: "",
  //   url: "",
  //   inputName: "",
  // });
  const handleClick = (value) => {
    setIsActive(value);
  };

  useEffect(() => {
    console.log("userSide: ", location.state);
    if (location.state && location.state.nickname !== null) {
      if (location.state && location.state.nickname === nickname) {
        setViewSide(true);
      } else {
        setViewSide(false);
      }
    }
    //
    if (location.state && location.state.nickname == null) {
      console.log("없음");
      setViewSide(true);
    }
  }, [nickname, location.state]);

  // console.log("temp", location.state && location.state.nickname);

  return (
    <MypageContent>
      {
        // 게시글을 통해 들어온 닉네임과 내 닉네임이 같을때
        (location.state === nickname ||
          // 게시글을 통해 들어오지 않을때
          location.state === null ||
          viewSide) && (
          <section className="side">
            <div className="imgwrap">
              <ProfileImg size="big" />
            </div>
            <ul className="nav">
              <li
                className={classNames("", { "is-active": isActive === "mypage" })}
                onClick={() => {
                  handleClick("mypage");
                  navigate("/mypage/activity");
                }}
              >
                활동내역
              </li>
              <li
                className={classNames("", { "is-active": isActive === "my-studyroom" })}
                onClick={() => {
                  handleClick("my-studyroom");
                  navigate("/mypage/my-studyrooms");
                }}
              >
                스터디룸
              </li>
              <li
                className={classNames("", { "is-active": isActive === "my-message" })}
                onClick={() => {
                  handleClick("my-message");
                  navigate("/mypage/my-message");
                }}
              >
                쪽지
              </li>
              <li
                className={classNames("", { "is-active": isActive === "account" })}
                onClick={() => {
                  handleClick("account");
                  navigate("/mypage/account");
                }}
              >
                회원정보수정 및 탈퇴
              </li>
            </ul>
            <Logout />
          </section>
        )
      }
      <>{isActive === "mypage" && <UserInfoList user={location.state} />}</>
      <>{isActive === "my-studyroom" && <MyStudyRoom />}</>
      <>{isActive === "my-message" && <MyMessage />}</>
      <>{isActive === "account" && <Account />}</>
    </MypageContent>
  );
};

export default Userside;

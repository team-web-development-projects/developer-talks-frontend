import { getUserActivity, getUserPost, getUserReply, getUserScrab } from "api/user";
import Pagination from "components/pagination/Pagination";
import { useEffect, useState, useMemo } from "react";
import Gravatar from "react-gravatar";
import { useQueries, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { INIT_PAGING, SET_PAGING } from "store/PagiNation";
import { MyActivity, MyPost, MyScrab, MyReply } from "./Constans";
// import MyReply from "./MyReply";
import s from "./userinfolist.module.scss";
import { getUserInfoApi } from "api/auth";
import { SET_USER_INFO } from "store/User";

const UserInfoList = ({ user }) => {
  const pageNumber = useSelector((state) => state.paginationStore);
  const storeUser = useSelector((state) => state.userStore);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [select, setSelect] = useState(0);

  const getNickname = location.state && location.state.nickname;
  const getUserProfile = location.state && location.state.userProfile;

  const getuser = user ? user.nickname : storeUser.nickname;

  const queries = useQueries([
    { queryKey: ["getuser"], queryFn: () => getUserInfoApi() },
    {
      queryKey: ["getActivity", select, getuser, pageNumber],
      queryFn: async () => {
        switch (select) {
          case 1:
            return getUserPost(pageNumber["userinfo"].item, getuser);
          case 2:
            return getUserReply(pageNumber["userinfo"].item, getuser);
          case 3:
            return getUserScrab(pageNumber["userinfo"].item, getuser);
          default:
            return getUserActivity(pageNumber["userinfo"].item, getuser);
        }
      },
      enabled: storeUser.nickname !== "",
    },
  ]);

  const userdata = queries[0].data;
  const isUserdataLoading = queries[0].isLoading;
  // console.log('czdsf', userdata);
  if (!isUserdataLoading) {
    dispatch(SET_USER_INFO({ nickname: userdata.nickname, userid: userdata.userid }));
  }

  const data = queries[1].data;
  const isLoading = queries[1].isLoading;

  useEffect(() => {
    if (user === null) {
      setSelect(0);
    }
  }, [user]);

  const onSelect = (type) => {
    setSelect(type);
    switch (type) {
      case 1:
        navigate(`/user/write/${getuser}`, { state: user });
        break;
      case 2:
        navigate(`/user/comment/${getuser}`, { state: user });
        break;
      case 3:
        navigate(`/user/scrab/${getuser}`, { state: user });
        break;
      default:
        navigate(`/user/recent/${getuser}`, { state: user });
        break;
    }
  };

  useEffect(() => {
    if (location.pathname.includes("user/recent")) {
      setSelect(0);
    }
    if (location.pathname.includes("user/write")) {
      setSelect(1);
    }
    if (location.pathname.includes("user/comment")) {
      setSelect(2);
    }
    if (location.pathname.includes("user/scrab")) {
      setSelect(3);
    }
  }, []);

  const contacts = ["최근활동", "내가 쓴 글", "댓글", "스크랩"];

  // console.log('data', data && data.content);

  // console.log("pageNumber : ", pageNumber.showuserTab, "user: ", user, "location :", location);

  return (
    <>
      <section className={s.contentWrap}>
        {getNickname !== storeUser.nickname && (
          <div>
            {getUserProfile ? (
              <img className={s.userProfile} src={getUserProfile} alt="프로필 이미지" />
            ) : (
              <Gravatar email={getNickname} className={s.userProfile} />
            )}
            {getNickname}
          </div>
        )}
        <ul className={s.nav}>
          {contacts.map((contact, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  onSelect(index);
                }}
                className={`${select === index ? `${s.select}` : ""}`}
              >
                {contact}
              </button>
            </li>
          ))}
        </ul>
        <div className={s.list}>
          {/*
          {queries[select].isSuccess && queries[select].data.content.length === 0 && <div>내용이 없습니다</div>}
        */}
          {/*
           */}
          {isLoading && <>로딩중..</>}
          {data &&
            data.content.length !== 0 &&
            data.content.map((item, index) => (
              <div key={index} className={s.userdata}>
                {select === 0 && MyActivity(item, 0)}
                {select === 1 && MyPost(item, 1)}
                {select === 2 && MyReply(item, 2)}
                {select === 3 && MyScrab(item, 3)}
              </div>
            ))}
          {!isLoading && data && data.content.length === 0 && <>내용이 없습니다.</>}
        </div>

        <Pagination totalPage={data && data.totalPages} name="userinfo" />
      </section>
    </>
  );
};

export default UserInfoList;

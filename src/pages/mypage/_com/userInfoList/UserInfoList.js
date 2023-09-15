import { getUserActivity, getUserPost, getUserReply, getUserScrab } from "api/user";
import Pagination from "components/pagination/Pagination";
import { useState } from "react";
import Gravatar from "react-gravatar";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { INIT_PAGING } from "store/PagiNation";
import { MyActivity, MyPost, MyReply, MyScrab } from "./Constans";
import s from "./userinfolist.module.scss";

const UserInfoList = ({ user }) => {
  const pageNumber = useSelector((state) => state.paginationStore);
  const storeUser = useSelector((state) => state.userStore);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [select, setSelect] = useState(0);

  const getNickname = location.state && location.state.nickname;
  const getUserProfile = location.state && location.state.userProfile;

  const getuser = user ? user.nickname : storeUser.nickname;
  const { data } = useQuery({
    queryKey: ["getActivity", select, getuser],
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
  });

  const onSelect = (type) => {
    setSelect(type);
  };
  const contacts = ["최근활동", "내가 쓴 글", "댓글", "스크랩"];

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
                  dispatch(INIT_PAGING({ name: "userinfo" }));
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
          {data && data.content.length !== 0 ? (
            data.content.map((item, index) => (
              <div key={index} className={s.userdata}>
                {select === 0 && MyActivity(item)}
                {select === 1 && MyPost(item)}
                {select === 2 && MyReply(item)}
                {select === 3 && MyScrab(item)}
              </div>
            ))
          ) : (
            <>내용이 없습니다.</>
          )}
        </div>

        <Pagination totalPage={data && data.totalPages} name="userinfo" />
      </section>
    </>
  );
};

export default UserInfoList;

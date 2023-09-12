import axios from "axios";
import { ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { MyActivity, MyPost, MyReply, MyScrab } from "./Constans";
import s from "./userinfolist.module.scss";
import { useQueries, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import Gravatar from "react-gravatar";
import Pagination from "components/pagination/Pagination";
import { getInStudyRoomBoard, getUserActivity, getUserPost, getUserReply, getUserScrab } from "api/user";
import { INIT_PAGING } from "store/PagiNation";

const UserInfoList = ({ user }) => {
  const auth = useSelector((state) => state.authToken);
  const pageNumber = useSelector((state) => state.paginationStore);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [select, setSelect] = useState(0);

  const getNickname = location.state && location.state.nickname;
  const getUserProfile = location.state && location.state.userProfile;
  const [nickname, setNickName] = useState("");
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState();

  useEffect(() => {
    setNickName(user ? user.nickname : parseJwt(auth.accessToken).nickname);
  }, [auth, user]);

  useEffect(() => {
    const getuser = user ? user.nickname : parseJwt(auth.accessToken).nickname;

    switch (select) {
      case 1:
        getUserPost(pageNumber["userinfo"].item, getuser).then((res) => {
          setPageData(res);
          setData(res.content);
        });
        break;
      case 2:
        getUserReply(pageNumber["userinfo"].item, getuser).then((res) => {
          setPageData(res);
          setData(res.content);
        });
        break;
      case 3:
        getUserScrab(pageNumber["userinfo"].item, getuser).then((res) => {
          setPageData(res);
          setData(res.content);
        });
        break;
      default:
        // BUG: 자신의 개인정보가 비공개일때 자신의 활동내역도 안보임.
        // activity().then((error) => console.log('error', error));
        getUserActivity(pageNumber["userinfo"].item, getuser).then((res) => {
          setPageData(res);
          setData(res.content);
        });
        break;
    }
  }, [nickname, pageNumber, user, auth, select]);

  const onSelect = (type) => {
    setSelect(type);
  };
  const contacts = ["최근활동", "내가 쓴 글", "댓글", "스크랩"];

  return (
    <>
      <section className={s.contentWrap}>
        {getNickname !== parseJwt(auth.accessToken).nickname && (
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
          {data.length !== 0 ? (
            data.map((item, index) => (
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

        <Pagination totalPage={pageData && pageData.totalPages} name="userinfo" />
      </section>
    </>
  );
};

export default UserInfoList;

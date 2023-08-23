import axios from "axios";
import { ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { MyActivity, MyPost, MyReply, MyScrab } from "./Constans";
import s from "./userinfolist.module.scss";
import { useQueries, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import Gravatar from "react-gravatar";
import Pagination from "components/pagination/Pagination";

const UserInfoList = ({ user }) => {
  const auth = useSelector((state) => state.authToken);
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();

  const [select, setSelect] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getNickname = location.state && location.state.nickname;
  const getUserProfile = location.state && location.state.userProfile;
  const [nickname, setNickName] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    setNickName(user ? user.nickname : parseJwt(auth.accessToken).nickname);
  }, [auth, user]);

  useEffect(() => {
    console.log('user', user, parseJwt(auth.accessToken).nickname)

    async function activity() {
      const { data } = await axios.get(
        `${ROOT_API}/users/recent/activity/${user ? user.nickname : parseJwt(auth.accessToken).nickname}`,
        {
          params: { page: currentPage - 1, size: 10 },
        }
      );
      return data;
    }

    async function post() {
      const { data } = await axios.get(
        `${ROOT_API}/post/list/user/${user ? user.nickname : parseJwt(auth.accessToken).nickname}`,
        {
          params: { page: currentPage - 1, size: 10 },
          headers: {
            "X-AUTH-TOKEN": auth.accessToken,
          },
        }
      );
      return data;
    }

    async function reply() {
      const { data } = await axios.get(`${ROOT_API}/comment/list/user/${nickname}`, {
        params: { page: currentPage - 1, size: 10 },
        headers: {
          "X-AUTH-TOKEN": auth.accessToken,
        },
      });
      return data;
    }

    async function scrab() {
      const { data } = await axios.get(`${ROOT_API}/post/list/favorite/${nickname}`, {
        params: { page: currentPage - 1, size: 10 },
        headers: {
          "X-AUTH-TOKEN": auth.accessToken,
        },
      });
      return data;
    }

    switch (select) {
      case 1:
        post().then((res) => setData(res.content));
        break;
      case 2:
        reply().then((res) => setData(res.content));
        break;
      case 3:
        scrab().then((res) => setData(res.content));
        break;
      default:
        // BUG: 자신의 개인정보가 비공개일때 자신의 활동내역도 안보임.
        activity().then((res) => setData(res.content));
        // activity().then((error) => console.log('error', error));
        break;
    }
  }, [nickname, currentPage, user, auth, select]);

  console.log("data", data);

  const onSelect = (type) => {
    setSelect(type);
  };
  const contacts = ["최근활동", "내가 쓴 글", "댓글", "스크랩"];

  // console.log("nickname", queries[select].data.content);
  // console.log("data", queries[select].data.content);
  // console.log("favorite", queries[select].isSuccess && queries[select].data.content);

  return (
    <>
      <section className={s.contentWrap}>
        {getNickname !== parseJwt(auth.accessToken).nickname && (
          <div>
            {getUserProfile ? (
              <img className={s.userProfile} src={getUserProfile} alt="프로필 이미지" />
            ) : (
              // <Gravatar email={getNickname} className={s.userProfile} />
              <div>{getNickname}</div>
            )}
            {getNickname}
          </div>
        )}
        <ul className={s.nav}>
          {contacts.map((contact, index) => (
            <li key={index}>
              <button onClick={() => onSelect(index)} className={`${select === index ? `${s.select}` : ""}`}>
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
          {data.length !== 0 ?
            data.map((item, index) => (
              <div key={index} className={s.userdata}>
                {select === 0 && MyActivity(item)}
                {select === 1 && MyPost(item)}
                {select === 2 && MyReply(item)}
                {select === 3 && MyScrab(item)}
              </div>
            ))
            : <>내용이 없습니다.</>
            }
        </div>
        {/*
        <Pagination
          currentPage={queries[select].isSuccess && queries[select].data.pageable.pageNumber + 1}
          totalPage={queries[select].isSuccess && queries[select].data.totalPages}
          paginate={setCurrentPage}
        />
       */}
      </section>
    </>
  );
};

export default UserInfoList;

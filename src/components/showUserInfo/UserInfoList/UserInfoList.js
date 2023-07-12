import axios from "axios";
import { ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Pagination from "./../../pagination/Pagination";
import { MyActivity, MyPost, MyReply, MyScrab } from "./Constans";
import s from "./userinfolist.module.scss";
import { useQueries } from "react-query";
import { useParams } from "react-router-dom";

const UserInfoList = () => {
  const auth = useSelector((state) => state.authToken);
  const navigate = useNavigate();
  const [select, setSelect] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const userId = parseJwt(auth.accessToken).userid;

  let targetNickname;

  const { nickname } = useParams();

  if (nickname) {
    targetNickname = nickname;
  } else {
    targetNickname = parseJwt(auth.accessToken).nickname;
  }

  const onSelect = (type) => {
    setSelect(type);
  };
  const contacts = ["최근활동", "내가 쓴 글", "댓글", "스크랩"];

  const queries = useQueries([
    { queryKey: ["activity", currentPage], queryFn: () => activity() },
    { queryKey: ["post", currentPage], queryFn: () => post() },
    { queryKey: ["reply"], queryFn: () => reply() },
    { queryKey: ["scrab", currentPage], queryFn: () => scrab() },
  ]);

  async function activity() {
    const { data } = await axios.get(`${ROOT_API}/users/recent/activity/${targetNickname}`, {
      params: { page: currentPage - 1, size: 10 },
    });
    return data;
  }
  async function post() {
    const { data } = await axios.get(`${ROOT_API}/post/list/user/${userId}`, {
      params: { page: currentPage - 1, size: 10 },
      headers: {
        "X-AUTH-TOKEN": auth.accessToken,
      },
    });
    return data;
  }
  async function reply() {
    const { data } = await axios.get(`${ROOT_API}/comment/list/user/${userId}`, {
      params: { page: currentPage - 1, size: 10 },
      headers: {
        "X-AUTH-TOKEN": auth.accessToken,
      },
    });
    return data;
  }
  async function scrab() {
    const { data } = await axios.get(`${ROOT_API}/post/list/favorite/${userId}`, {
      params: { page: currentPage - 1, size: 10 },
      headers: {
        "X-AUTH-TOKEN": auth.accessToken,
      },
    });
    return data;
  }

  console.log("favorite", queries[select].isSuccess && queries[select].data.content);

  return (
    <>
      {auth.accessToken !== null ? (
        <section className={s.contentWrap}>
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
            {queries[select].isSuccess && queries[select].data.content.length === 0 && <div>내용이 없습니다</div>}
            {queries[select].isSuccess &&
              queries[select].data.content.map((item, index) => (
                <div key={index} className={s.userdata}>
                  {select === 0 && MyActivity(item)}
                  {select === 1 && MyPost(item)}
                  {select === 2 && MyReply(item)}
                  {select === 3 && MyScrab(item)}
                </div>
              ))}
          </div>
          <Pagination
            currentPage={queries[select].isSuccess && queries[select].data.pageable.pageNumber + 1}
            totalPage={queries[select].isSuccess && queries[select].data.totalPages}
            paginate={setCurrentPage}
          />
        </section>
      ) : null}
    </>
  );
};

export default UserInfoList;

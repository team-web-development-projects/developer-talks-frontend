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
import { getInStudyRoomBoard, getUserActivity, getUserPost, getUserReply, getUserScrab } from "api/user";

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
  const [pageData, setPageData] = useState();

  useEffect(() => {
    setNickName(user ? user.nickname : parseJwt(auth.accessToken).nickname);
  }, [auth, user]);

  useEffect(() => {
    const getuser = user ? user.nickname : parseJwt(auth.accessToken).nickname;
    console.log('get', getuser);

    switch (select) {
      case 1:
        getUserPost(currentPage, getuser).then((res) => {
          setPageData(res);
          setData(res.content);
        });
        break;
      case 2:
        getUserReply(currentPage, getuser).then((res) => {
          setPageData(res);
          setData(res.content);
        });
        break;
      case 3:
        getUserScrab(currentPage, getuser).then((res) => {
          setPageData(res);
          setData(res.content);
        });
        break;
      default:
        getUserActivity(currentPage, getuser).then((res) => {
          setPageData(res);
          setData(res.content);
        });
        break;
    }
  }, [nickname, currentPage, user, auth, select]);

  const onSelect = (type) => {
    setSelect(type);
  };
  const contacts = ["최근활동", "내가 쓴 글", "댓글", "스크랩"];

  console.log("data", data);

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

        <Pagination
          currentPage={pageData && pageData.pageable.pageNumber + 1}
          totalPage={pageData && pageData.totalPages}
          paginate={setCurrentPage}
        />
      </section>
    </>
  );
};

export default UserInfoList;

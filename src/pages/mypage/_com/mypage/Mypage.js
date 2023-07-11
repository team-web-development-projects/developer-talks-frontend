import axios from "axios";
import { ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Pagination from "components/pagination/Pagination";
import s from "../../mypagecontent.module.scss";
import mypage from "./mypage.module.scss";
import MypageContent from "pages/mypage/MyPageContent";
import { MyActivity, MyPost, MyReply, MyScrab } from "./Constans";
import { useQueries } from "react-query";

const Mypage = ({ type }) => {
  const auth = useSelector((state) => state.authToken);
  const navigate = useNavigate();
  const [select, setSelect] = useState(0);
  // const [favorite, setFavorite] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  let userId;
  let nickname;
  if (auth.accessToken !== null) {
    userId = parseJwt(auth.accessToken).userid;
    nickname = parseJwt(auth.accessToken).nickname;
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
    const { data } = await axios.get(`${ROOT_API}/users/recent/activity/${nickname}`, {
      params: { page: currentPage - 1, size: 10 }, //NOTE 가람님이 활동 시간명 변경
      headers: {
        "X-AUTH-TOKEN": auth.accessToken,
      },
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
  // console.log("data", select, queries[select].isSuccess && queries[select].data.content);
  useEffect(() => {
    // setCurrentPage(1);
  }, []);

  useEffect(() => {
    switch (select) {
      case 0:
        // axios
        //   .get(
        //     // 최근 활동 = 글작성, 댓글, 답변 등 모든 내용 포함 //1
        //     `${ROOT_API}/users/recent/activity/${nickname}`,
        //     {
        //       params: { page: 0, size: 10 }, //NOTE 가람님이 활동 시간명 변경
        //       headers: {
        //         "X-AUTH-TOKEN": auth.accessToken,
        //       },
        //     }
        //   )
        //   .then((res) => {
        //     setFavorite(res.data.content);
        //     console.log("1", res.data.content);
        //   })
        //   .catch(() => {
        //     console.log(nickname);
        //     console.log(parseJwt(auth.accessToken));
        //   });
        // setSelect(0);
        break;
      case 1:
        // axios
        //   .get(`${ROOT_API}/post/list/user/${userId}`, {
        //     params: { page: 0, size: 10 },
        //     headers: {
        //       "X-AUTH-TOKEN": auth.accessToken,
        //     },
        //   })
        //   .then((res) => {
        //     setFavorite(res.data.content);
        //     console.log("1", res.data.content);
        //   });
        // setSelect(1);
        break;
      case 2:
        // axios
        //   .get(`${ROOT_API}/comment/list/user/${userId}`, {
        //     params: { page: 0, size: 10 },
        //     headers: {
        //       "X-AUTH-TOKEN": auth.accessToken,
        //     },
        //   })
        //   .then((res) => {
        //     setFavorite(res.data);
        //     console.log("2", res.data);
        //   });
        break;
      case 3:
        // axios
        //   .get(
        //     // 즐겨찾기 & 스크랩//4
        //     `${ROOT_API}/post/list/favorite/${userId}`,
        //     {
        //       params: { page: 0, size: 10 },
        //       headers: {
        //         "X-AUTH-TOKEN": auth.accessToken,
        //       },
        //     }
        //   )
        //   .then((res) => {
        //     setFavorite(res.data.content);
        //     console.log("3", res.data.content);
        //   });

        break;
      default:
    }
  }, [auth.accessToken, navigate, select, userId]);

  // console.log("favorite", queries[0].isSuccess && queries[0].data);
  // console.log("favorite", queries[1].isSuccess && queries[1].data.content);
  // console.log("favorite", queries[2].isSuccess && queries[2].data.content);
  // console.log("favorite", queries[select].isSuccess && queries[select].data.content);
  // console.log("favorite", queries[3].isSuccess && queries[3].data);

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
          <div className={mypage.list}>
              {/*
              <Link to="/mypage?param1=value1&param2=value2">Go to Page</Link>
             */}
            {
              queries[select].isSuccess && queries[select].data.content.length === 0 && <div>내용이 없습니다</div> // 수정필요
            }
            {queries[select].isSuccess &&
              queries[select].data.content.map((item, index) => (
                <div key={index} className={mypage.userdata}>
                  {
                    // item.title
                    select === 0 && MyActivity(item)
                    // MyActivity(item && item)
                    // queries[select].isSuccess && 'true'
                  }
                  {select === 1 && MyPost(item)}
                  {select === 2 && MyReply(item)}
                  {
                    select === 3 && MyScrab(item)
                    // queries[select].isSuccess && queries[select].data.content && select === 3 && MyScrab(item)
                  }

                  {/*
                    {(item.viewCount || item.viewCount === 0) && (
                      <span className={mypage.viewCount}>조회수 {item.viewCount}</span>
                    )}
                    {(item.recommendCount || item.recommendCount === 0) && (
                      <span className={mypage.viewCount}>추천수 {item.recommendCount}</span>
                    )}
                    {(item.favoriteCount || item.favoriteCount === 0) && (
                      <span className={mypage.viewCount}>좋아요수 {item.favoriteCount}</span>
                    )}
                      */}
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

export default Mypage;

import axios from "axios";
import { ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MypageContent from "./MyPageContent";
import s from "./mypage.module.scss";
import Pagination from "components/pagination/Pagination";

const Mypage = ({ type }) => {
  const auth = useSelector((state) => state.authToken);
  const navigate = useNavigate();
  const [select, setSelect] = useState(0);
  const [favorite, setFavorite] = useState([]);
  let userId = "";
  if (auth.accessToken !== null) {
    userId = parseJwt(auth.accessToken).userid;
  }

  const onSelect = (type) => {
    setSelect(type);
  };
  const contacts = ["최근활동", "내가 쓴 글", "댓글", "스크랩"];

  useEffect(() => {
    switch (select) {
      case 0:
        axios
          .get(
            // 최근 활동 = 글작성, 댓글, 답변 등 모든 내용 포함 //1
            `${ROOT_API}/users/recent/activity/${userId}`,
            {
              params: { page: 0, size: 10 }, //NOTE 가람님이 활동 시간명 변경
              headers: {
                "X-AUTH-TOKEN": auth.accessToken,
              },
            }
          )
          .then((res) => {
            setFavorite(res.data.content);
            console.log("1", res.data.content);
          });
        break;
      case 1:
        axios
          .get(`${ROOT_API}/post/list/user/${userId}`, {
            params: { page: 0, size: 10 },
            headers: {
              "X-AUTH-TOKEN": auth.accessToken,
            },
          })
          .then((res) => {
            setFavorite(res.data.content);
            console.log("1", res.data.content);
          });
        break;
      case 2:
        axios
          .get(`${ROOT_API}/comment/list/user/${userId}`, {
            params: { page: 0, size: 10 },
            headers: {
              "X-AUTH-TOKEN": auth.accessToken,
            },
          })
          .then((res) => {
            setFavorite(res.data);
            console.log("2", res.data);
          });
        break;
      case 3:
        axios
          .get(
            // 즐겨찾기 & 스크랩//4
            `${ROOT_API}/post/list/favorite/${userId}`,
            {
              params: { page: 0, size: 10 },
              headers: {
                "X-AUTH-TOKEN": auth.accessToken,
              },
            }
          )
          .then((res) => {
            setFavorite(res.data.content);
            console.log("3", res.data.content);
          });

        break;
      default:
    }
    if (auth.accessToken === null && localStorage.getItem("refreshToken") === null) {
      navigate("/login", { replace: true });
    }
  }, [auth.accessToken, navigate, select, userId]);

  return (
    <>
      {auth.accessToken !== null ? (
        <MypageContent>
          <section className={s.contentwrap}>
            <ul className={s.nav}>
              {contacts.map((contact, index) => (
                <li key={index}>
                  <button onClick={() => onSelect(index)} className={`${select === index ? `${s.select}` : ""}`}>
                    {contact}
                  </button>
                </li>
              ))}
            </ul>
            <div className="">
              {favorite === undefined || favorite.length === 0 ? (
                <>{contacts.contact}내용이 없습니다</>// 수정필요
              ) : (
                favorite.map((item, index) => (
                  <div key={index} className={s.userdata}>
                    <div className={s.text}>
                      <div className={s.type}>
                        {item.type && item.type === "COMMENT" ? (
                          <>
                            <span>{item.writer || item.nickname}</span>
                            <p>님의 질문에 달린 답변에</p>
                            <span>댓글</span>
                            <p>을 작성하였습니다</p>
                          </>
                        ) : (
                          <>
                            <p>카테고리에</p>
                            <span>질문</span>
                            <p>을 작성하였습니다.</p>
                          </>
                        )}
                        {item.secret == false && "🔓"}
                        {item.secret == true && "🔒"}
                        {(item.viewCount || item.viewCount === 0) && <span className={s.viewCount}>조회수 {item.viewCount}</span>}
                        {(item.recommendCount || item.recommendCount === 0) && <span className={s.viewCount}>추천수 {item.recommendCount}</span>}
                        {(item.favoriteCount || item.favoriteCount === 0) && <span className={s.viewCount}>좋아요수 {item.favoriteCount}</span>}
                      </div>
                      {(item.title || item.postTitle) && (
                        <p className={s.title} onClick={() => navigate(`/board/${item.id}`)}>
                          {item.title || item.postTitle}{" "}
                        </p>
                      )}
                    </div>
                    <div className={s.createtime}>{item.createDate}</div>
                  </div>
                ))
              )}
            </div>
            {/* <Pagination currentPage={data.pageable.pageNumber + 1} totalPage={data.totalPages} paginate={setCurrentPage} /> */}
          </section>
        </MypageContent>
      ) : null}
    </>
  );
};

export default Mypage;

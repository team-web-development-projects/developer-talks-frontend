import axios from "axios";
import { ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MypageContent from "./MyPageContent";
import "./Mypage.scss";

const Mypage = ({ type }) => {
  const auth = useSelector((state) => state.authToken);
  const navigate = useNavigate();
  const [select, setSelect] = useState(-1);
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
        if (auth.accessToken === null) {
          navigate("/login", { replace: true });
        }
  }, [auth.accessToken, navigate, select, userId]);

  return (
    <>
      {auth.accessToken !== null ? (
        <MypageContent>
          <section className="content-wrap">
            <ul className="nav">
              {contacts.map((contact, index) => (
                <li key={index}>
                  <button onClick={() => onSelect(index)} className={`${select === index ? "select" : ""}`}>
                    {contact}
                  </button>
                </li>
              ))}
            </ul>
            <div className="">
              {favorite === undefined || favorite.length === 0 ? (
                <>내용이 없습니다</> //NOTE 내용없음 버그 수정//ok
              ) : (
                favorite.map((item, index) => (
                  <div key={index} className="user-data">
                    {item.writer || item.nickname}
                    <div className="create-time">{item.createDate}</div>
                    {(item.title || item.postTitle) && (
                      <p className="title" onClick={() => navigate(`/board/${item.id}`)}>
                        타이틀: {item.title || item.postTitle}{" "}
                      </p>
                    )}
                    {item.viewCount && <span>조회수 {item.viewCount}</span>}
                    {item.content && (
                      <>
                        <span dangerouslySetInnerHTML={{ __html: item.content }}></span>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>
        </MypageContent>
      ) : null}
    </>
  );
};

export default Mypage;

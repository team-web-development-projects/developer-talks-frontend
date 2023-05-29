import axios from "axios";
import Userside from "components/userside/Userside";
import { parseJwt } from "hooks/useParseJwt";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./Mypage.scss";
import { ROOT_API } from "constants/api";

const Mypage = ({ type }) => {
  const auth = useSelector((state) => state.authToken);
  const navigate = useNavigate();
  const [select, setSelect] = useState(-1);
  const [favorite, setFavorite] = useState([]);
  const dispatch = useDispatch();

  let userId = "";
  if (auth.accessToken !== null) {
    userId = parseJwt(auth.accessToken).userid;
  }
  if (auth.accessToken === null) {
    navigate("/login", { replace: true });
  }

  const onSelect = (type) => {
    setSelect(type);
  };

  const contacts = [
    {
      userId: 0,
      type: '최근활동'
    },
    {
      userId: 1,
      type: '내가 쓴 글'
    },
    {
      userId: 2,
      type: '댓글'
    },
    {
      userId: 3,
      type: '스크랩'
    },
  ]
  useEffect(() => {
    switch (select) {
      case 0:
        axios
          .get(
            // 최근 활동 = 글작성, 댓글, 답변 등 모든 내용 포함 //1
            `${ROOT_API}/users/recent/activity`,
            {
              params: { page: 0, size: 10 }, //NOTE 가람님이 활동 시간명 변경
              headers: {
                "X-AUTH-TOKEN": auth.accessToken,
              },
            }
          )
          .then((res) => {
            setFavorite(res.data.content);
            // console.log("1", res.data.content);
          });
        break;
      case 1:
        axios
          .get(
            // 작성글//2
            `${ROOT_API}/post/list/user/${userId}`,
            {
              params: { page: 0, size: 10 },
              headers: {
                "X-AUTH-TOKEN": auth.accessToken,
              },
            }
          )
          .then((res) => {
            setFavorite(res.data.content);
            // console.log("1", res.data.content);
          });
        break;
      case 2:
        axios
          .get(
            // 댓글//NOTE 정상//3
            `${ROOT_API}/comment/list/user/${userId}`,
            {
              params: { page: 0, size: 10 },
              headers: {
                "X-AUTH-TOKEN": auth.accessToken,
              },
            }
          )
          .then((res) => {
            setFavorite(res.data.content);
            // console.log("2", res.data.content);
          });
        break;
      case 3:
        axios
          .get(
            // 즐겨찾기 & 스크랩//4
            `${ROOT_API}/post/list/favorite/${userId}`, //1번
            {
              params: { page: 0, size: 10 },
              headers: {
                "X-AUTH-TOKEN": auth.accessToken,
              },
            }
          )
          .then((res) => {
            setFavorite(res.data.content);
            // console.log("3", res.data.content);
          });
        break;
      default:
    }
    // console.log("dd", favorite);
  }, [auth.accessToken, navigate, select, userId, favorite]);
  // console.log("dd", favorite);

  return (
    <>
      {auth.accessToken !== null ? (
        <main className="mypage">
          <Userside />

          <section className="notes">
            <ul>
              {contacts.map((contact, index) => (
                <li key={index}>
                  <button
                    onClick={() => onSelect(index)}
                    className={`${select === index ? "select" : ""}`}
                  >
                    {contact.type}
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
                    <div className="create-time">{item.createDate}</div>
                    <span
                      className="title"
                      onClick={() => navigate(`/board/${item.id}`)}
                    >
                      {item.title}{" "}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>
      ) : null}
    </>
  );
};

export default Mypage;

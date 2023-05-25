import axios from "axios";
import Userside from "components/userside/Userside";
import { parseJwt } from "hooks/useParseJwt";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./Mypage.scss";
import { contacts } from "./dummyData";
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

  useEffect(() => {
    switch (select) {
      case 0:
        // axios
        //   .get(
        //     // 최근 활동 = 글작성, 댓글, 답변 등 모든 내용 포함
        //     `${ROOT_API}/post/list/user/${userId}`,
        //     {
        //       params: { page: 0, size: 10 }, //NOTE 파람스??
        //       headers: {
        //         "X-AUTH-TOKEN": auth.accessToken,
        //       },
        //     }
        //   )
        //   .then((res) => {
        //     setFavorite(res.data.content);
        //     console.log("1", res.data.content);
        //   });
        break;
      case 1:
        axios
          .get(
            // 작성글
            `${ROOT_API}/post/list/user/${userId}`,
            {
              params: { page: 0, size: 10 }, //NOTE 파람스??
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
      case 2:
        axios
          .get(
            // 댓글
            `${ROOT_API}/comment/list/user/${userId}`,
            {
              params: { page: 0, size: 10 }, //NOTE 파람스??
              headers: {
                "X-AUTH-TOKEN": auth.accessToken,
              },
            }
          )
          .then((res) => {
            setFavorite(res.data.content);
            console.log("2", res.data.content);
          });
        break;
      case 3:
        axios
          .get(
            // 즐겨찾기 & 스크랩
            `${ROOT_API}/post/list/favorite/${userId}`, //1번
            {
              params: { page: 0, size: 10 }, //NOTE 파람스??
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
    console.log("dd");
  }, [auth.accessToken, navigate, select, userId]);

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
              {favorite ? (
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
              ) : (
                <>내용이 없습니다.</>
              )}
            </div>
          </section>
        </main>
      ) : null}
    </>
  );
};

export default Mypage;

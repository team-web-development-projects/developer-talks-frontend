import axios from "axios";
import { ROOT_API } from "constants/api";
import { useEffect, useState } from "react";
import { useLocation, useMatch, useParams } from "react-router-dom";
import s from "./boardDetail.module.scss";
import BoardReply from "components/boardReply/BoardReply";
import { useSelector } from "react-redux";
import Editor from "components/editor/Editor";
import { parseJwt } from "hooks/useParseJwt";
import { useNavigate } from "react-router-dom";

const BoardDetail = ({ type }) => {
  const { postId } = useParams();
  const auth = useSelector((state) => state.authToken);
  const match = useMatch(`/${type}/list/:postId`);
  const location = useLocation();
  const [post, setPost] = useState([]);
  const navigate = useNavigate();

  const nickname = parseJwt(auth.accessToken).nickname;

  useEffect(() => {
    if (match && !location.state) {
      navigate(`/${type}`, { replace: true });
    }
  }, [match, location.state, navigate, type]);

  useEffect(() => {
    axios
      .get(`${ROOT_API}/${type}/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then((res) => setPost(res.data))
      .catch((error) => console.log(error));
  }, []);

  // TODO: 백엔드 통신: 답변 가져오기
  const editPost = () => {
    // axios
    //   .put(`${ROOT_API}/${type}/${postId}`, {
    //     body: {},
    //     headers: {
    //       "Content-Type": "application/json",
    //       "X-AUTH-TOKEN": auth.accessToken,
    //     },
    //   })
    //   .then((res) => setPost(res.data))
    //   .catch((error) => console.log(error));
  };

  const deletePost = () => {
    axios
      .delete(`${ROOT_API}/${type}/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className={s.container}>
        <header>
          <p className={s.nick}>{post.nickname}</p>
          <div className={s.info}>
            <p>2023.05.06 •</p>
            <p>👁️‍🗨️100</p>
          </div>
          {nickname === post.nickname && (
            <div>
              <button>수정</button>
              <button onClick={deletePost}>삭제</button>
            </div>
          )}
        </header>
        <main>
          <p className={s.title}>{post.title}</p>
          {/* TODO: content 내용 이슈 */}
          <div
            className={s.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </main>
        <div className={s.reply}>
          <p className={s.title}>답변 0</p>
          <Editor />
          <button>작성</button>
          <ul className={s.replies}>
            <BoardReply type={type} />
          </ul>
        </div>
      </div>
    </>
  );
};

export default BoardDetail;

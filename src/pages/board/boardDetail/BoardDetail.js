import axios from "axios";
import { ROOT_API } from "constants/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import s from "./boardDetail.module.scss";
import BoardReply from "components/boardReply/BoardReply";

const BoardDetail = ({ type }) => {
  const { postId } = useParams();
  const [post, setPost] = useState([]);
  useEffect(() => {
    axios
      .get(`${ROOT_API}/post/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": localStorage.getItem("token"),
        },
      })
      .then((res) => setPost(res.data))
      .catch((error) => console.log(error));
  }, []);
  // TODO: 백엔드 통신: 답변 가져오기
  return (
    <>
      <div className={s.container}>
        <header>
          <p className={s.nick}>{post.nickname}</p>
          <div className={s.info}>
            <p>2023.05.06 •</p>
            <p>👁️‍🗨️100</p>
          </div>
        </header>
        <main>
          <p className={s.title}>{post.title}</p>
          {/* TODO: content 내용 이슈 */}
          <p className={s.content}>{post.content}</p>
        </main>
        <div className={s.reply}>
          <p className={s.title}>답변 0</p>
          <form>
            <input type="text" placeholder="답변을 작성해보세요." />
          </form>
          <ul className={s.replies}>
            <BoardReply type={type} />
          </ul>
        </div>
      </div>
    </>
  );
};

export default BoardDetail;

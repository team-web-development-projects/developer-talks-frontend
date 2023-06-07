import axios from "axios";
import BoardCount from "components/boardCount/BoardCount";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import ReplyPost from "pages/board/_com/replyPost/ReplyPost";
import { ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import { useEffect, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { FiThumbsUp } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import s from "./boardDetail.module.scss";

const BoardDetail = ({ type }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authToken);
  const [post, setPost] = useState([]);
  const [nickname, setNickName] = useState("");
  const [checkStatus, setCheckStatus] = useState([]);
  const [modalD, setModalD] = useState(false);

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
    if (auth.accessToken !== null) {
      setNickName(parseJwt(auth.accessToken).nickname);
      axios
        .get(`${ROOT_API}/post/check/status/${postId}`, {
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": auth.accessToken,
          },
        })
        .then(({ data }) => {
          setCheckStatus(data);
          console.log(data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const deletePost = () => {
    axios
      .delete(`${ROOT_API}/${type}/${postId}`, {
        headers: {
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then(() => setModalD(true))
      .catch((error) => console.log(error));
  };
  const clickUpdate = () => {
    navigate(`/${type === "post" ? "board" : "qna"}/update/${post.id}`, {
      state: { title: post.title, content: post.content },
    });
  };
  return (
    <>
      {modalD && (
        <BasicModal setOnModal={() => setModalD()}>
          게시글이 삭제되었습니다.
          <br />
          <button onClick={() => navigate(-1)}>확인</button>
          <br />
        </BasicModal>
      )}
      <div className={s.container}>
        <header>
          <span className={s.nick}>{post.nickname}</span>
          <div className={s.info}>
            <span>{post.createDate} •</span>
            <span>조회수 {post.viewCount}</span>
          </div>
          <p className={s.title}>{post.title}</p>
          {nickname === post.nickname && (
            <div>
              <button onClick={clickUpdate}>수정</button>
              <button onClick={deletePost}>삭제</button>
            </div>
          )}
        </header>
        <main>
          {/* TODO: content 내용 이슈 */}
          <div
            className={s.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </main>
        <div className={s.countContainer}>
          <BoardCount
            type={"favorite"}
            token={auth.accessToken}
            isOwner={nickname === post.nickname}
            checkStatus={checkStatus}
            setCheckStatus={setCheckStatus}
            postId={post.id}
            setPost={setPost}
          >
            <AiOutlineStar/>
            <p>{post.favoriteCount}</p>
          </BoardCount>
          <BoardCount
            type={"recommend"}
            token={auth.accessToken}
            isOwner={nickname === post.nickname}
            checkStatus={checkStatus}
            setCheckStatus={setCheckStatus}
            postId={post.id}
            setPost={setPost}
          >
            <FiThumbsUp />
            <p>{post.recommendCount}</p>
          </BoardCount>
        </div>
        <ReplyPost nickname={nickname} />
      </div>
    </>
  );
};

export default BoardDetail;

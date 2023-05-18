import axios from "axios";
import { ROOT_API } from "constants/api";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import s from "./boardDetail.module.scss";
import BoardReply from "components/boardReply/BoardReply";
import { useSelector } from "react-redux";
import Editor from "components/editor/Editor";
import { parseJwt } from "hooks/useParseJwt";
import Button from "components/button/Button";
import { AiOutlineStar } from "react-icons/ai";
import { FiThumbsUp } from "react-icons/fi";
import BasicModal from "components/portalModal/basicmodal/BasicModal";

const BoardDetail = ({ type }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authToken);
  const [post, setPost] = useState([]);
  const [checkStatus, setCheckStatus] = useState([]);
  const [modal, setModal] = useState(false);
  const [nickname, setNickName]=useState("");

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
          console.log('nickname parseJWT: ',nickname)
        })
        .catch((error) => console.log(error));
    }
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
  const clickUpdate = () => {
    navigate(`/${type === "post" ? "board" : "qna"}/update/${post.id}`, {
      state: { title: post.title, content: post.content },
    });
  };
  const handleClickFavorite = async (e) => {
    if (auth.accessToken === null) {
      setModal(true);
    } else if (nickname === post.nickname) {
      console.log("본인글 즐겨찾기 불가");
    } else {
      if (!checkStatus.favorite) {
        e.preventDefault();
        await new Promise((r) => setTimeout(r, 1000));
        axios
          .post(
            `${ROOT_API}/post/favorite/${post.id}`,
            {
              //요청데이터
            },
            {
              headers: {
                "X-AUTH-TOKEN": auth.accessToken,
              },
            }
          )
          .then((response) => {
            console.log(response);
            setCheckStatus({ ...checkStatus, ["favorite"]: true });
          })
          .catch((error) => console.log(error));
      } else {
        console.log("즐겨찾기는 한 번만 누를 수 있어");
      }
    }
  };
  const handleClickRecommend = async (e) => {
    if (auth.accessToken === null) {
      setModal(true);
    } else if (nickname === post.nickname) {
      console.log("본인글 추천 불가");
    }else {
      if (!checkStatus.recommend) {
        e.preventDefault();
        await new Promise((r) => setTimeout(r, 1000));
        axios
          .post(
            `${ROOT_API}/post/recommend/${post.id}`,
            {
              //요청데이터
            },
            {
              headers: {
                "X-AUTH-TOKEN": auth.accessToken,
              },
            }
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => console.log(error));
      }else {
        console.log("추천은 한 번만 누를 수 있어");
      }
    }
  };
  return (
    <>
      {modal && (
        <BasicModal setOnModal={() => setModal()}>
          로그인한 사용자만 이용할 수 있어요☺️
          <br />
          <Link to="/login">[로그인 하러 가기]</Link>
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
          {nickname === post.nickname && (
            <div>
              <button onClick={clickUpdate}>수정</button>
              <button onClick={deletePost}>삭제</button>
            </div>
          )}
        </header>
        <main>
          <span className={s.title}>{post.title}</span>
          {/* TODO: content 내용 이슈 */}
          <div
            className={s.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </main>
        <div className={s.countContainer} on>
          <Button classname={s.btn} onClick={handleClickFavorite}>
            <AiOutlineStar />
            <p>{post.favoriteCount}</p>
          </Button>
          <Button classname={s.btn} onClick={handleClickRecommend}>
            <FiThumbsUp />
            <p>{post.recommendCount}</p>
          </Button>
        </div>
        <div className={s.notice_reply}>
          <span className={s.title}>답변 0</span>
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

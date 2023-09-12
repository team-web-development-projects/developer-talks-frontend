import { getReply } from "api/board";
import axios from "axios";
import BoardCount from "components/boardCount/BoardCount";
import Button from "components/button/Button";
import { Modal } from "components/portalModal/Modal";
import MessageModal from "components/portalModal/messagemodal/MessageModal";
import ReportModal from "components/portalModal/reportmodal/ReportModal";
import ShowUserInfo from "components/showUserInfo/ShowUserInfo";
import { ROOT_API } from "constants/api";
import { useOutOfClick } from "hooks/useOutOfClick";
import { parseJwt } from "hooks/useParseJwt";
import ReplyList from "pages/board/_com/replyList/ReplyList";
import { useEffect, useRef, useState } from "react";
import Gravatar from "react-gravatar";
import { AiOutlineStar } from "react-icons/ai";
import { FiThumbsUp } from "react-icons/fi";
import { RiAlarmWarningFill } from "react-icons/ri";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AnswerList from "../_com/answerList/AnswerList";
import s from "./boardDetail.module.scss";

const BoardDetail = ({ type }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authToken);
  const targetRef = useRef(null);
  const [nickname, setNickName] = useState("");
  const [post, setPost] = useState({
    userInfo: {},
    imageUrls: [],
  });
  const [checkStatus, setCheckStatus] = useState([]);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [modalReport, setModalReport] = useState(false);

  const fetchPost = async (type, postId, auth) => {
    const response = await axios.get(`${ROOT_API}/${type}/${postId}`, {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": auth.accessToken,
      },
    });
    let cnt = 0;
    response.data.imagedContent = response.data.content.replace(/<img>/g, (match, capture) => {
      return `<img src=${response.data.imageUrls[cnt++]} />`;
    });
    setPost(response.data);
    console.log(response.data);
  };

  const { isLoading, isError } = useQuery(["boardDetail"], () => fetchPost(type, postId, auth));

  useEffect(() => {
    if (auth.accessToken !== null) {
      setNickName(auth && parseJwt(auth.accessToken).nickname);
      const res = getReply(type, postId);
      res
        .then((res) => {
          setCheckStatus(res);
          console.log(res);
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
      .then(() => navigate(-1))
      .catch((error) => console.log(error));
  };

  const clickUpdate = () => {
    navigate(`/${type === "post" ? "board" : "qna"}/update/${post.id}`, {
      state: { title: post.title, content: post.imagedContent, imgUrls: post.imageUrls },
    });
  };

  useOutOfClick(targetRef, () => {
    setShowUserInfo(false);
  });

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;

  return (
    <>
      <div className={s.container}>
        <header>
          <div className={s.userInfoContainer}>
            {post.userInfo.userProfile !== null ? (
              <img className={s.profile} src={post.userInfo.userProfile} alt="프로필 이미지" />
            ) : (
              <Gravatar email={post.userInfo.nickname} className={s.profile} />
            )}
            <div>
              {/*NOTE 닉네임 클릭 시 유저정보 */}
              <ShowUserInfo userinfo={post.userInfo} type="detail" />
              <div className={s.info}>
                <span>{post.createDate}&nbsp;&nbsp;&nbsp;</span>
                <span>조회수 {post.viewCount}</span>
                <RiAlarmWarningFill className={s.report} onClick={() => setModalReport(!modalReport)} />
              </div>
            </div>
          </div>
          <p className={s.title}>{post.title}</p>
          {nickname === post.userInfo.nickname && (
            <div className={s.button_wrap}>
              <Button onClick={clickUpdate} size="small" theme="success">
                수정
              </Button>
              {post.commentCount === 0 ? (
                <Button onClick={deletePost} size="small" theme="cancle">
                  삭제
                </Button>
              ) : (
                <Button
                  classname={s.btnCancle}
                  onClick={() => {
                    toast.error("댓글이 있는 게시글은 삭제가 불가능합니다.");
                  }}
                  size="small"
                >
                  삭제
                </Button>
              )}
            </div>
          )}
        </header>
        <main>
          {/* TODO: content 내용 이슈 */}
          <div className={s.content} dangerouslySetInnerHTML={{ __html: post.imagedContent }}></div>
        </main>
        <div className={s.countContainer}>
          <BoardCount
            ttype={type}
            type={"favorite"}
            token={auth.accessToken}
            isOwner={nickname === post.userInfo.nickname}
            checkStatus={checkStatus}
            setCheckStatus={setCheckStatus}
            postId={post.id}
            setPost={setPost}
          >
            <AiOutlineStar />
            <span>{post.favoriteCount}</span>
          </BoardCount>
          <BoardCount
            ttype={type}
            type={"recommend"}
            token={auth.accessToken}
            isOwner={nickname === post.userInfo.nickname}
            checkStatus={checkStatus}
            setCheckStatus={setCheckStatus}
            postId={post.id}
            setPost={setPost}
          >
            <FiThumbsUp />
            <span>{post.recommendCount}</span>
          </BoardCount>
        </div>

        {type === "post" ? (
          <ReplyList nickname={nickname} replyCnt={post.commentCount} />
        ) : (
          <AnswerList nickname={nickname} answerCnt={post.commentCount} qnaNick={post.userInfo.nickname} selectAnswer={post.selectAnswer} />
        )}
      </div>
      {modalReport && (
        <MessageModal
          setOnModal={() => setModalReport()}
          dimClick={() => false}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Modal.Content>
            <ReportModal setOnModal={setModalReport} type="board" postId={postId}></ReportModal>
          </Modal.Content>
        </MessageModal>
      )}
    </>
  );
};

export default BoardDetail;

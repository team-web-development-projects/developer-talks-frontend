import axios from "axios";
import BoardCount from "components/boardCount/BoardCount";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import ReplyList from "pages/board/_com/replyList/ReplyList";
import { ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import { useEffect, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { FiThumbsUp } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import s from "./boardDetail.module.scss";
import Button from "components/button/Button";
import { randomProfile } from "hooks/useRandomProfile";
import ShowUserInfo from "components/showUserInfo/ShowUserInfo";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import Gravatar from "react-gravatar";

const BoardDetail = ({ type }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authToken);
  const [post, setPost] = useState({
    userInfo: {},
    imageUrls: [],
  });
  const [nickname, setNickName] = useState("");
  const [checkStatus, setCheckStatus] = useState([]);
  const [modalD, setModalD] = useState(false);

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
  };

  const { isLoading, isError } = useQuery(["boardDetail"], () => fetchPost(type, postId, auth));

  useEffect(() => {
    // axios
    //   .get(`${ROOT_API}/${type}/${postId}`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "X-AUTH-TOKEN": auth.accessToken,
    //     },
    //   })
    //   .then((res) => {
    //     let cnt = 0;
    //     res.data.imagedContent = res.data.content.replace(/<img>/g, (match, capture) => {
    //       return `<img src=${res.data.imageUrls[cnt++]} />`;
    //     });
    //     setPost(res.data);
    //     console.log(res.data);
    //   })
    //   .catch((error) => console.log(error));
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
      state: { title: post.title, content: post.imagedContent, imgUrls: post.imageUrls },
    });
  };

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;

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
          <div className={s.userInfoContainer}>
            {post.userInfo.userProfile !== null ? (
              <img className={s.profile} src={post.userInfo.userProfile} alt="프로필 이미지" />
            ) : (
              <Gravatar email={post.userInfo.nickname} className={s.profile} />
            )}
            <div>
              {/*NOTE 닉네임 클릭 시 유저정보 */}
              <ShowUserInfo post={post} ninkname={post.userInfo.nickname}>
                <span className={s.nick}>{post.userInfo.nickname}</span>
              </ShowUserInfo>
              <div className={s.info}>
                <span>{post.createDate}&nbsp;&nbsp;&nbsp;</span>
                <span>조회수 {post.viewCount}</span>
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
        <ReplyList nickname={nickname} />
      </div>
    </>
  );
};

export default BoardDetail;

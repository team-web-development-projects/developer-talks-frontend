import React, { useEffect, useState } from "react";
import s from "./replyPost.module.scss";
import { ROOT_API } from "constants/api";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CkEditor from "components/ckeditor/CkEditor";
import Button from "components/button/Button";
import { BsLock, BsUnlock } from "react-icons/bs";
import ReplyItem from "pages/board/_com/replyItem/ReplyItem";

const ReplyPost = ({ nickname }) => {
  const auth = useSelector((state) => state.authToken);
  const { postId } = useParams();
  const [replyList, setReplyList] = useState([]);
  const [controlRender, setControlRender] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [form, setForm] = useState({
    content: "",
    secret: true,
  });
  const scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  const handleClick = () => {
    setIsToggle((prev) => !prev);
  };
  //TODO: 시크릿 에러 잡기
  const toggleSecret = () => {
    //   setForm((prevForm) => {
    //     return { ...prevForm, secret: !prevForm.secret };
    //   });
    //   console.log(form.secret);
    setForm({ ...form, ["secret"]: !form.secret });
  };
  const handlePost = () => {
    console.log("secret: ", form.secret);
    axios
      .post(
        `${ROOT_API}/comment/${postId}`,
        {
          content: form.content,
          secret: form.secret,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": auth.accessToken,
          },
        }
      )
      .then((response) => {
        setControlRender((prev) => !prev);
        scrollDown();
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    setIsToggle(false);
    axios
      .get(`${ROOT_API}/comment/list/post/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then(({ data }) => {
        setReplyList(data);
        console.log("답변 get결과: ", data);
      })
      .catch((error) => console.log(error));
  }, [controlRender]);
  return (
    <>
      <div className={s.notice_reply}>
        <div className={s.title}>댓글 {replyList.length}</div>
        {isToggle ? (
          <div className={s.inputTrue}>
            <CkEditor form={form} setForm={setForm} placeholder="" />
            <div className={s.btnRgn}>
              <div className={s.secret} onClick={toggleSecret}>
                {form.secret ? <BsLock size={20} /> : <BsUnlock size={20} />}
                시크릿 댓글
              </div>
              <div className={s.cancel} onClick={handleClick}>
                취소
              </div>
              <Button classname={s.post} onClick={handlePost}>
                등록
              </Button>
            </div>
          </div>
        ) : auth.accessToken ? (
          <div className={s.inputFalse} onClick={handleClick}>
            {nickname}님, 댓글을 작성해보세요.
          </div>
        ) : (
          <div className={s.inputFalse}>로그인 후, 댓글을 달아주세요.</div>
        )}
        {replyList ? (
          replyList.map((reply) => (
            <ReplyItem
              key={reply.id}
              id={reply.id}
              postId={postId}
              content={reply.content}
              isSelf={reply.nickname===nickname}
              nickname={reply.nickname}
              secret={reply.secret}
              childrenList={reply.childrenList}
              setControlRender={setControlRender}
            />
          ))
        ) : (
          <div>등록된 답변이 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default ReplyPost;

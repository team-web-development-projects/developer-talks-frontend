import React, { useState } from "react";
import s from "./replyItem.module.scss";
import { BsLock, BsUnlock } from "react-icons/bs";
import Button from "components/button/Button";
import CkEditor from "components/ckeditor/CkEditor";
import axios from "axios";
import { ROOT_API } from "constants/api";
import { useSelector } from "react-redux";
const ReplyItem = ({ id, postId, content, nickname, secret, childrenList }) => {
  const auth = useSelector((state) => state.authToken);
  const [ispostToggle, setIsPostToggle] = useState(false);
  const [isgetToggle, setIsGetToggle] = useState(false);
  const [form, setForm] = useState({
    content: "",
    secret: false,
  });
  const [rereplyList, setRereplyList] = useState(childrenList);
  const handleToggle = () => {
    setIsPostToggle((prev) => !prev);
  };
  //TODO: 시크릿 에러 잡기
  const toggleSecret = () => {
    setForm((prevForm) => {
      return { ...prevForm, secret: !prevForm.secret };
    });
    console.log(form.secret);
  };
  const handlePost = () => {
    axios
      .post(
        `${ROOT_API}/comment/${postId}/${id}`,
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
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
  return (
    <li className={s.container}>
      <p>{nickname}</p>
      {secret ? <BsLock size={20} /> : <BsUnlock size={20} />}
      <div
        className={s.content}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      <Button onClick={handleToggle}>대댓글 달기</Button>
      {ispostToggle && (
        <div className={s.rereplyContainer}>
          <CkEditor form={form} setForm={setForm} />
          <div className={s.btnRgn}>
            <div className={s.secret} onClick={toggleSecret}>
              {form.secret ? <BsLock size={20} /> : <BsUnlock size={20} />}
              시크릿 댓글
            </div>
            <div className={s.cancel} onClick={handleToggle}>
              취소
            </div>
            <Button classname={s.post} onClick={handlePost}>
              등록
            </Button>
          </div>
        </div>
      )}
      <p>대댓글리스트</p>
      {childrenList &&
        childrenList.map((rereply) => (
          <li>
            <p>닉네임: {rereply.nickname}</p>
            <p>대댓글 내용: {rereply.content}</p>
          </li>
        ))}
    </li>
  );
};

export default ReplyItem;

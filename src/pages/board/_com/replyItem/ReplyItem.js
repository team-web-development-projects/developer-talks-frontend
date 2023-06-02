import React, { useState } from "react";
import s from "./replyItem.module.scss";
import { BsLock, BsUnlock } from "react-icons/bs";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineMessage,
} from "react-icons/ai";
import Button from "components/button/Button";
import CkEditor from "components/ckeditor/CkEditor";
import axios from "axios";
import { ROOT_API } from "constants/api";
import { useSelector } from "react-redux";
import RereplyItem from "pages/board/_com/rereplyItem/RereplyItem";
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
  const handleClickReRe = () => {
    setIsGetToggle((prev) => !prev);
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
      <div className={s.info}>
        <p>{nickname}</p>
        {secret ? <BsLock size={20} /> : <BsUnlock size={20} />}
      </div>
      <div
        className={s.content}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      <div className={s.replyBtnContainer}>
        {rereplyList.length ? (
          <button className={s.replyBtn} onClick={handleClickReRe}>
            {isgetToggle ? (
              <div>
                <AiFillCaretUp className={s.icon} />
                숨기기
              </div>
            ) : (
              <div>
                <AiFillCaretDown className={s.icon} />
                {rereplyList.length}개 대댓글
              </div>
            )}
          </button>
        ) : (
          <div></div>
        )}
        <button onClick={handleToggle} className={s.replyBtn}>
          <AiOutlineMessage size={20} className={s.icon} />
          대댓글 달기
        </button>
      </div>
      <div className={s.rereplyContainer}>
        <div className={s.box}></div>
        <div>
          {ispostToggle && (
            <div>
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
          {isgetToggle &&
            childrenList.map((rereply) => (
              <RereplyItem key={rereply.id} rr={rereply} />
            ))}
        </div>
      </div>
    </li>
  );
};

export default ReplyItem;

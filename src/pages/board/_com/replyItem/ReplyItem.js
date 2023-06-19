import React, { useState } from "react";
import s from "./replyItem.module.scss";
import { BsLock, BsUnlock } from "react-icons/bs";
import { AiFillCaretDown, AiFillCaretUp, AiOutlineMessage } from "react-icons/ai";
import Button from "components/button/Button";
import CkEditor from "components/ckeditor/CkEditor";
import axios from "axios";
import { ROOT_API } from "constants/api";
import { useSelector } from "react-redux";
import RereplyItem from "pages/board/_com/rereplyItem/RereplyItem";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { set } from "react-hook-form";
const ReplyItem = ({ id, postId, content, isSelf, nickname, secret, childrenList, setControlRender }) => {
  const auth = useSelector((state) => state.authToken);
  const [ispostToggle, setIsPostToggle] = useState(false);
  const [isgetToggle, setIsGetToggle] = useState(false);
  const [isUpdateToggle, setIsUpdateToggle] = useState(false);
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
  const handleUpdate = () => {
    setIsUpdateToggle((prev) => !prev);
    setForm({ ...form, ["content"]: content });
  };
  const handleUpdatePost = () => {
    axios
      .put(
        `${ROOT_API}/comment/${id}`,
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
      .then(() => {
        setControlRender((prev) => !prev);
        setIsUpdateToggle((prev) => !prev);
      })
      .catch((error) => console.log(error));
  };
  const handleUpdateCancle = () => {
    setIsUpdateToggle((prev) => !prev);
  };
  const handleDelete = () => {
    axios
      .delete(`${ROOT_API}/comment/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then(() => {
        toast.success("댓글이 정상적으로 삭제되었습니다.", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
        });
        setControlRender((prev) => !prev);
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <li className={s.container}>
        <div className={s.info}>
          <p>{nickname}</p>
          {secret ? <BsLock size={20} /> : <BsUnlock size={20} />}
          {isSelf ? (
            <div>
              <button onClick={handleUpdate}>수정</button>
              <button onClick={handleDelete}>삭제</button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {isUpdateToggle ? (
          <div>
            <CkEditor form={form} setForm={setForm} />
            <div className={s.btnRgn}>
              <div className={s.secret} onClick={toggleSecret}>
                {form.secret ? <BsLock size={20} /> : <BsUnlock size={20} />}
                시크릿 댓글
              </div>
              <div className={s.cancel} onClick={handleUpdateCancle}>
                취소
              </div>
              <Button classname={s.post} onClick={handleUpdatePost}>
                수정
              </Button>
            </div>
          </div>
        ) : (
          <div className={s.content} dangerouslySetInnerHTML={{ __html: content }}></div>
        )}
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
            {isgetToggle && childrenList.map((rereply) => <RereplyItem key={rereply.id} rr={rereply} />)}
          </div>
        </div>
      </li>
    </>
  );
};

export default ReplyItem;

import axios from "axios";
import Button from "components/button/Button";
import CkEditor from "components/ckeditor/CkEditor";
import { ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import RereplyItem from "pages/board/_com/rereplyItem/RereplyItem";
import { useEffect, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BsLock, BsUnlock } from "react-icons/bs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./replyItem.module.scss";

const ReplyItem = ({ postId, reply, setControlRender }) => {
  const auth = useSelector((state) => state.authToken);
  const [ispostToggle, setIsPostToggle] = useState(false);
  const [isgetToggle, setIsGetToggle] = useState(true);
  const [isUpdateToggle, setIsUpdateToggle] = useState(false);
  const [form, setForm] = useState({
    content: "",
    userInfo: {},
    secret: false,
    childrenList: [],
  });
  const [isSelf, setIsSelf] = useState(false);
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
        `${ROOT_API}/comment/${postId}/${reply.id}`,
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
    setForm({ ...form, ["content"]: reply.content });
  };
  const handleUpdatePost = () => {
    axios
      .put(
        `${ROOT_API}/comment/${reply.id}`,
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
      .delete(`${ROOT_API}/comment/${reply.id}`, {
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
  useEffect(() => {
    if (auth.accessToken !== null) {
      const nickname = parseJwt(auth.accessToken).nickname;
      if (nickname === reply.nickname) {
        setIsSelf(true);
      }
    }
  }, []);
  return (
    <>
      <li className={s.container}>
        <div className={s.info}>
          <img className={s.profile} src={reply.userInfo.userProfile} alt="profile" />
          <div>
            <p className={s.nickname}>{reply.userInfo.nickname}</p>
            <p className={s.date}>{reply.modifiedDate}</p>
          </div>
          {reply.secret && <BsLock size={20} />}
          {isSelf ? (
            <div className={s.btn_wrap}>
              <Button onClick={handleUpdate} size="small">
                수정
              </Button>
              <Button onClick={handleDelete} size="small" theme="cancle">
                삭제
              </Button>
            </div>
          ) : null}
        </div>
        {isUpdateToggle ? (
          <div>
            <CkEditor form={form} setForm={setForm} />
            <div className={s.btnRgn}>
              <div className={s.secret} onClick={toggleSecret}>
                {form.secret ? <BsLock size={20} /> : <BsUnlock size={20} />}
                시크릿 댓글
              </div>
              <Button theme="outline" color="#9ca3af" size="medium" onClick={handleUpdateCancle}>
                취소
              </Button>
              <Button size="medium" onClick={handleUpdatePost}>
                수정
              </Button>
            </div>
          </div>
        ) : (
          <div className={s.content} dangerouslySetInnerHTML={{ __html: reply.content }}></div>
        )}
        <div className={s.replyBtnContainer}>
          {reply.childrenList.length ? (
            <button className={s.replyBtn} onClick={handleClickReRe}>
              {isgetToggle ? (
                <>
                  <AiFillCaretUp className={s.icon} />
                  댓글 모두 숨기기
                </>
              ) : (
                <>
                  <AiFillCaretDown className={s.icon} />
                  댓글 {reply.childrenList.length}개 보기
                </>
              )}
            </button>
          ) : (
            <div></div>
          )}
          <button onClick={handleToggle} className={s.replyBtn}>
            댓글 쓰기
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
                  <Button theme="outline" color="#9ca3af" size="medium" onClick={handleToggle}>
                    취소
                  </Button>
                  <Button size="medium" onClick={handlePost}>
                    등록
                  </Button>
                </div>
              </div>
            )}
            {isgetToggle && reply.childrenList.map((rereply) => <RereplyItem key={rereply.id} rr={rereply} />)}
          </div>
        </div>
      </li>
    </>
  );
};

export default ReplyItem;

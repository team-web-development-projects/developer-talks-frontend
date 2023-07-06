import axios from "axios";
import Button from "components/button/Button";
import CkEditor from "components/ckeditor/CkEditor";
import { ROOT_API } from "constants/api";
import ReplyItem from "pages/board/_com/replyItem/ReplyItem";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import s from "./replyList.module.scss";

const ReplyList = ({ nickname }) => {
  const auth = useSelector((state) => state.authToken);
  const { postId } = useParams();
  const [replyList, setReplyList] = useState([]);
  const [controlRender, setControlRender] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [form, setForm] = useState({
    content: "",
    secret: false,
  });
  // const scrollDown = () => {
  //   window.scrollTo({
  //     top: document.documentElement.scrollHeight,
  //     behavior: "smooth",
  //   });
  // };
  const handleClick = () => {
    setIsToggle((prev) => !prev);
  };

  const handlePost = (e) => {
    e.preventDefault();
    console.log("secret: ", form.secret);
    if (!form.content) {
      alert("댓글을 입력해주세요.");
      return;
    }
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
        // scrollDown();
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    setIsToggle(false);
    setForm({ ["content"]: "", ["secret"]: false});
    
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
          <form onSubmit={handlePost}>
            <div className={s.inputTrue}>
              <CkEditor form={form} setForm={setForm} placeholder="" />
              <div className={s.btnRgn}>
                <label className={s.secret}>
                  <input
                    type="checkbox"
                    name="secret"
                    onChange={() => {
                      setForm({ ...form, ["secret"]: !form.secret });
                    }}
                  />{" "}
                  시크릿 댓글
                </label>
                <Button classname={s.cancle} theme="outline" color="#9ca3af" size="medium" onClick={handleClick}>
                  취소
                </Button>
                <Button size="medium">등록</Button>
              </div>
            </div>
          </form>
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
              reply={reply}
              postId={postId}
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

export default ReplyList;

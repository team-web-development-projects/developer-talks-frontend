import axios from "axios";
import Button from "components/button/Button";
import CkEditor from "components/ckeditor/CkEditor";
import { ROOT_API } from "constants/api";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AnswerItem from "../answerItem/AnswerItem";
import s from "./anwerList.module.scss";

const AnswerList = ({ nickname, answerCnt, qnaNick, selectAnswer }) => {
  const auth = useSelector((state) => state.authToken);
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const [isToggle, setIsToggle] = useState(false);
  const [form, setForm] = useState({
    content: "",
  });
  const handleClick = () => {
    setIsToggle((prev) => !prev);
    setForm({ ["content"]: "" });
  };
  const postCommentMutation = useMutation(
    (newComment) =>
      axios.post(`${ROOT_API}/answers/${postId}`, newComment, {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": auth.accessToken,
        },
      }),
    {
      onSuccess: () => {
        setIsToggle((prev) => !prev);
        setForm({ ["content"]: "" });
        queryClient.invalidateQueries(["answerList"]);
      },
    }
  );
  const handlePost = (e) => {
    e.preventDefault();
    const newComment = {
      content: form.content,
    };
    postCommentMutation.mutate(newComment);
  };
  const { isLoading, data: answerList } = useQuery(["answerList"], async () => {
    const res = await axios.get(`${ROOT_API}/answers/list/question/${postId}`, {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": auth.accessToken,
      },
    });
    return res.data;
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className={s.notice_reply}>
        <div className={s.title}>답변 {answerCnt}</div>
        {isToggle ? (
          <form onSubmit={handlePost}>
            <div className={s.inputTrue}>
              <CkEditor form={form} setForm={setForm} placeholder="" />
              <div className={s.btnRgn}>
                <Button classname={s.cancle} theme="outline" color="#9ca3af" size="medium" onClick={handleClick}>
                  취소
                </Button>
                <Button size="medium">등록</Button>
              </div>
            </div>
          </form>
        ) : auth.accessToken ? (
          <div className={s.inputFalse} onClick={handleClick}>
            {nickname}님, 답변을 작성해보세요.
          </div>
        ) : (
          <div className={s.inputFalse}>로그인 후, 답변을 달아주세요.</div>
        )}
        {answerList ? (
          answerList.map((answer) => <AnswerItem key={answer.id} answer={answer} qnaNick={qnaNick} selectAnswer={selectAnswer} />)
        ) : (
          <div>등록된 답변이 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default AnswerList;

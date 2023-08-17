import axios from "axios";
import Button from "components/button/Button";
import CkEditor from "components/ckeditor/CkEditor";
import { ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import { useEffect, useState } from "react";
import Gravatar from "react-gravatar";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import s from "./answerItem.module.scss";

const AnswerItem = ({ answer, qnaNick, selectAnswer }) => {
  const auth = useSelector((state) => state.authToken);
  const queryClient = useQueryClient();
  const [nickname, setNickName] = useState("");
  const [isUpdateToggle, setIsUpdateToggle] = useState(false);
  const [form, setForm] = useState({
    content: answer.content,
  });
  const [isSelf, setIsSelf] = useState(false);

  const updateCommentMutation = useMutation(
    (updatedComment) =>
      axios.put(`${ROOT_API}/answers/${answer.id}`, updatedComment, {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": auth.accessToken,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["answerList"]);
        setIsUpdateToggle((prev) => !prev);
      },
    }
  );

  const deleteCommentMutation = useMutation(
    () =>
      axios.delete(`${ROOT_API}/answers/${answer.id}`, {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": auth.accessToken,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["answerList"]);
        queryClient.invalidateQueries(["boardDetail"]);
        toast.success("답변이 삭제되었습니다.");
      },
    }
  );

  const selectCommentMutation = useMutation(
    () =>
      axios.post(
        `${ROOT_API}/answers/${answer.id}/select`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": auth.accessToken,
          },
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["answerList"]);
        toast.success("채택되었습니다.");
      },
    }
  );

  const handleUpdate = () => {
    setIsUpdateToggle((prev) => !prev);
    setForm({ ["content"]: answer.content });
  };

  const handleUpdatePost = (e) => {
    e.preventDefault();
    const updatedComment = {
      content: form.content,
      secret: form.secret,
    };
    updateCommentMutation.mutate(updatedComment);
  };

  const handleUpdateCancle = () => {
    setForm({ ["content"]: answer.content });
    setIsUpdateToggle((prev) => !prev);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteCommentMutation.mutate();
  };

  const handleSelect = (e) => {
    if (!selectAnswer) {
      e.preventDefault();
      selectCommentMutation.mutate();
    } else {
      toast.error("채택은 한개만 가능합니다.");
    }
  };
  useEffect(() => {
    console.log(answer.id);
    if (auth.accessToken !== null) {
      const nickname = parseJwt(auth.accessToken).nickname;
      setNickName(nickname);
      if (nickname === answer.userInfo.nickname) {
        setIsSelf(true);
      }
    }
  }, []);

  return (
    <li className={s.container}>
      {nickname === qnaNick ? (
        answer.selected ? (
          <div className={s.selectContainer}>
            <AiOutlineCheckCircle className={s.selectInner} />
            &nbsp;
            <p className={s.selectInner}>채택완료</p>
          </div>
        ) : (
          <div className={s.noSelectContainer} onClick={handleSelect}>
            <AiOutlineCheckCircle className={s.noSelectInner} />
            &nbsp;
            <p className={s.noSelectInner}>채택하기</p>
          </div>
        )
      ) : (
        answer.selected && (
          <div className={s.selectContainer}>
            <AiOutlineCheckCircle className={s.selectInner} />
            &nbsp;
            <p className={s.selectInner}>채택답변</p>
          </div>
        )
      )}
      <div>
        <div className={s.info}>
          {answer.userInfo.userProfile !== null ? (
            <img className={s.profile} src={answer.userInfo.userProfile} alt="프로필 이미지" />
          ) : (
            <Gravatar email={answer.userInfo.nickname} className={s.profile} />
          )}
          <div>
            <p className={s.nickname}>{answer.userInfo.nickname}</p>
            <p className={s.date}>{answer.modifiedDate}</p>
          </div>
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
          <form onSubmit={handleUpdatePost}>
            <div>
              <CkEditor form={form} setForm={setForm} />
              <div className={s.btnRgn}>
                <Button classname={s.cancle} theme="outline" color="#9ca3af" size="medium" onClick={handleUpdateCancle}>
                  취소
                </Button>
                <Button size="medium">수정</Button>
              </div>
            </div>
          </form>
        ) : (
          <div className={s.content} dangerouslySetInnerHTML={{ __html: answer.content }}></div>
        )}
      </div>
      <ToastContainer />
    </li>
  );
};

export default AnswerItem;

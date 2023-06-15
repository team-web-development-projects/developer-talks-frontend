import React, { useState } from "react";
import s from "./boardReply.module.scss";
import CkEditor from "components/ckeditor/CkEditor";
import Editor from "components/editor/Editor";
import Button from "components/button/Button";

const BoardReply = ({ type }) => {
  const [reply, setReply] = useState(false);

  const toggleReply = () => {
    setReply(!reply);
  };

  return (
    <li>
      <div className={s.nickname}>닉네임</div>
      <div className={s.content}>답변 내용ㅂㄷㅈㄱㄷㅈㄱ</div>
      <div className={s.reply}>
        <span onClick={toggleReply}>댓글 쓰기</span>
        {reply && (
          <div>
            <Editor />
            <div className={s.btnwrap}>
              <Button type="cancle" onClick={() => setReply(false)}>
                취소
              </Button>
              <Button type="success">댓글 쓰기</Button>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default BoardReply;

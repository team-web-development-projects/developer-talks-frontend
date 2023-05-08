import React from "react";
import s from "./boardItem.module.scss";
import { useNavigate } from "react-router-dom";

const BoardItem = ({ id, title, content, nickname, type }) => {
  const navigate = useNavigate();
  return (
    <>
      <li
        key={id}
        className={s.boardContainer}
        onClick={() => {
          type === "board"
            ? navigate(`/board/list/${id}`)
            : navigate(`/qna/list/${id}`);
        }}
      >
        <p className={s.title}>{title}</p>
        <p className={s.content}>{content}</p>
        <p className={s.nickname}>{nickname}</p>
      </li>
    </>
  );
};

export default BoardItem;

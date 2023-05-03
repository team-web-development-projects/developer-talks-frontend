import React from "react";
import s from "./boardItem.module.scss"
const BoardItem = ({id, title, content, nickname}) => {
  return (
    <>
      <li key={id} className={s.boardContainer}>
        <p className={s.title}>{title}</p>
        <p className={s.content}>{content}</p>
        <p className={s.nickname}>{nickname}</p>
      </li>
    </>
  );
};

export default BoardItem;

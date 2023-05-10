import React from "react";
import s from "./boardItem.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_ROUTER } from "store/PageRouter";

const BoardItem = ({ id, title, content, nickname, type, currentPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const linkClick = (id, type) => {
    if (type === "post") {
      navigate(`/board/list/${id}`);
    } else {
      navigate(`/qna/list/${id}`);
    }
    dispatch(SET_ROUTER({ state: currentPage }));
  };

  return (
    <>
      <li
        key={id}
        className={s.boardContainer}
        onClick={() => linkClick(id, type)}
      >
        <p className={s.title}>{title}</p>
        <p className={s.content}>{content}</p>
        <p className={s.nickname}>{nickname}</p>
      </li>
    </>
  );
};

export default BoardItem;

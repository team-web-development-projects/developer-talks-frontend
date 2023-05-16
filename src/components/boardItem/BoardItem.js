import React from "react";
import s from "./boardItem.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_ROUTER } from "store/PageRouter";
import axios from 'axios';
import { ROOT_API } from 'constants/api';

const BoardItem = ({ id, title, content, nickname, type, currentPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authToken);
  const linkClick = (id, type) => {
    if (type === "post") {
        // axios
        //   .put(
        //     `${ROOT_API}/post/view/${id}`,
        //     {
        //       headers: {
        //         "Content-Type": "application/json",
        //         "X-AUTH-TOKEN": auth.accessToken,
        //       },
        //     }
        //   )
        //   .then((response) => {
        //     console.log(response);
        //     navigate(`/board/list/${id}`);
        //   })
        //   .catch((error) => console.log(error));
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

import React from "react";
import s from "./rereplyItem.module.scss";

const RereplyItem = ({ rr }) => {
  return (
    <li className={s.container}>
      <div className={s.nickname}>{rr.nickname}</div>
      <div
        className={s.content}
        dangerouslySetInnerHTML={{ __html: rr.content }}
      ></div>
    </li>
  );
};

export default RereplyItem;

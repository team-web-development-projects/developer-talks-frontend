import React from "react";
import s from "./replyItem.module.scss";
import { BsLock, BsUnlock } from "react-icons/bs";

const ReplyItem = ({ id, content, nickname, secret }) => {
  return (
    <li className={s.container}>
      <p>{nickname}</p>
      <div
        className={s.content}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      {secret ? <BsLock size={20} /> : <BsUnlock size={20} />}
    </li>
  );
};

export default ReplyItem;

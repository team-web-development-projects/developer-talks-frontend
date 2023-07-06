import React, { useEffect, useState } from "react";
import s from "./messageinputbox.module.scss";
import { useSelector } from "react-redux";
import { ROOT_API } from "constants/api";
import axios from "axios";
import { showToast } from "components/toast/showToast";

const MessageInputBox = ({datas,setDatas} ) => {
  const auth = useSelector((state) => state.authToken);


  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    axios
      .get(`${ROOT_API}/messages/sent`, {
        headers: {
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then((response) => {
        const datas = response.data;
        setDatas(datas);
      });
  };

  const deleteMessage = (id) => {
    axios
      .delete(`${ROOT_API}/messages/sent/${id}`, {
        headers: {
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then((response) => {
        setDatas((prevDatas) => prevDatas.filter((data) => data.id !== id));
      })
      .catch((error) => {
        showToast("errors", "😎 정보를 다시 확인해주세요.");
      });
  };

  return (
    <div className={s.messageinboxcontainer}>
      <ul className={s.messagelistcontainer}>
        {datas.map((data) => (
          <li key={data.id} className={s.messagelist}>
            <div className={s.messageitem}>
              <div className={s.sender}>{data.receiverNickname}</div>
              <div className={s.timestamp}>{data.senderNickname}</div>
              <div className={s.content}>
                <p>{data.text}</p>
              </div>
              <button onClick={() => deleteMessage(data.id)}>삭제</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageInputBox;

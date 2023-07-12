import React from "react";
import s from "./showuserinfo.module.scss";
import { useState } from "react";
import DropDown from "components/dropdown/DropDown";
import MessageModal from "components/message/messagemodal/MessageModal";
import MessageForm from "components/message/messageForm/MessageForm";
import axios from "axios";
import { ROOT_API } from "constants/api";
import { showToast } from "components/toast/showToast";
import { useNavigate } from "react-router-dom";

const ShowUserInfo = ({ children, recieverNick }) => {
  const [datas, setDatas] = useState([]);
  let navigate = useNavigate();

  const userInfo = async (e) => {
    axios
      .get(`${ROOT_API}/users/private/${recieverNick}`)
      .then((response) => {
        if (response.data) {
          showToast("success", "😎 유저가 비공개인 상태입니다.");
        } else {
          navigate(`/showuser/${recieverNick}`);
        }
      })
      .catch((error) => {
        showToast("error", "😎 자기 자신은 볼 수 없어요.");
      });
  };

  return (
    <MessageModal
      messageForm={
        <DropDown>
          <li onClick={userInfo}>유저정보보기</li>
          <li>
            <MessageModal messageForm={<MessageForm setDatas={setDatas} recieverNick={recieverNick} />}>쪽지보내기</MessageModal>
          </li>
        </DropDown>
      }
    >
      {children}
    </MessageModal>
  );
};

export default ShowUserInfo;

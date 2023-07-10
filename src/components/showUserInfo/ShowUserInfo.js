import React from "react";
import s from "./showuserinfo.module.scss";
import { useState } from "react";
import DropDown from "components/dropdown/DropDown";
import MessageModal from "components/message/messagemodal/MessageModal";
import MessageForm from "components/message/messageForm/MessageForm";

const ShowUserInfo = ({ children,recieverNick }) => {
  const [datas, setDatas] = useState([]);

  return (
    <MessageModal
      children={children}
      messageForm={
        <DropDown>
          <li>유저정보보기</li>
          <li>
            <MessageModal messageForm={<MessageForm setDatas={setDatas} recieverNick={recieverNick} />} >쪽지보내기</MessageModal>
          </li>
        </DropDown>
      }
    />
  );
};

export default ShowUserInfo;

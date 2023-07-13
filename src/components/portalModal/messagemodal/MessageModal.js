import React, { useState, useRef, useEffect } from "react";
import s from "./messagemodal.module.scss";
import ModalFrame from "../ModalFrame";
import MessageForm from "components/message/messageForm/MessageForm";

const MessageModal = ({ setOnModal, children, dimClick, isDim = true, recieverNick, setSendForm }) => {
  // const [sendForm, setSendForm] = useState(true);

  return (
    <>
      <ModalFrame
        setOnModal={setOnModal}
        classname={`${s.userinfowrap} basic-modal`}
        isDim={isDim}
        onClose
        dimClick={dimClick}
      >
        <MessageForm recieverNick={recieverNick} setSendForm={setOnModal} />
      </ModalFrame>
    </>
  );
};

export default MessageModal;

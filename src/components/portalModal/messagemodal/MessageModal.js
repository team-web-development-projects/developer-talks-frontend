import React, { useState, useRef, useEffect } from "react";
import s from "./messagemodal.module.scss";
import ModalFrame from "../ModalFrame";

const MessageModal = ({ setOnModal, children, dimClick, isDim = true, messageForm, onClick }) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <ModalFrame
      setOnModal={setOnModal}
      classname={`${s.userinfowrap} basic-modal`}
      isDim={isDim}
      onClose
      onClick={onClick}
      dimClick={dimClick}
    >
      {children}
    </ModalFrame>
  );
};

export default MessageModal;

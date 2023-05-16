import classnames from "classnames";
import React, { useEffect, useState } from "react";
import ModalFrame from "../ModalFrame";
import "./basicmodal.scss";

const BasicModal = ({ setOnModal, children, dimClick }) => {
  return (
    <ModalFrame
      setOnModal={setOnModal}
      classname="basic-modal"
      isDim
      onClose
      dimClick={dimClick}
    >
      {children}
    </ModalFrame>
  );
};
export default BasicModal;

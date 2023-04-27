import classnames from "classnames";
import React, { useEffect, useState } from "react";
import ModalFrame from "../ModalFrame";
import "./basicmodal.scss";

const BasicModal = ({ setOnModal, children }) => {
  return (
    <ModalFrame setOnModal={setOnModal} classname="basic-modal" isDim onClose>
      {children}
    </ModalFrame>
  );
};
export default BasicModal;

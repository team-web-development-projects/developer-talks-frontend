import React from "react";
import ModalFrame from "../ModalFrame";
import "./loadingmodal.scss";

const LoadingModal = ({ setOnModal }) => {
  return (
    <ModalFrame setOnModal={setOnModal} classname="loading-modal">
      로딩중일때 모달인데 안써도 무방
    </ModalFrame>
  );
};
export default LoadingModal;

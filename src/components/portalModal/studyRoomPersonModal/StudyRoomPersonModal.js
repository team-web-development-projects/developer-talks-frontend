import React from "react";
import ModalFrame from "../ModalFrame";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ROOT_API } from "constants/api";

const StudyRoomPersonModal = ({ setOnModal, id }) => {
  const auth = useSelector((state) => state.authToken);
  const getOut = () => {
    axios
      .delete(
        `${ROOT_API}/study-room/expel/${id}`, {
          params: {},
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": auth.accessToken,
          },
        },
      )
      .then((response) => {
        // console.log(response.data);
        alert("수정되었습니다");
      })
      .catch((error) => console.log(error));
  }

  return (
    <ModalFrame setOnModal={setOnModal} classname="basic-modal studyroom-setting-modal" onClose isDim>
      인원관리 모달
      <br /> 강퇴
      <br /> 권한부여
      <br /> 권한변경
    </ModalFrame>
  );
};

export default StudyRoomPersonModal;

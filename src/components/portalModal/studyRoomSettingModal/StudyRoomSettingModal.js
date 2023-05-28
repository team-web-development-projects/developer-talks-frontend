import React from "react";
import ModalFrame from "../ModalFrame";
import "./studyroomsettingmodal.scss";
import { useMutation, useQueryClient } from "react-query";
import { ROOT_API } from "constants/api";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import BasicModal from "../basicmodal/BasicModal";

const StudyRoomSettingModal = ({ setOnModal, id }) => {
  const auth = useSelector((state) => state.authToken);
  const [confirmState, setConfirmState] = useState();
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    axios.get(`${ROOT_API}/study-room/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": auth.accessToken,
      },
    }).then(res => {
      console.log('rr', res);
    })
  })

  return (
    <>
      {modal && (
        // <BasicModal setOnModal={() => setModal()}>
        //   삭제할래?
        //   <br />
        //   <button onClick={() => setConfirmState(true)}>네</button>
        //   <br />
        //   <button>아니오</button>
        // </BasicModal>
        <div>11</div>
      )}
      <ModalFrame
        setOnModal={setOnModal}
        classname="basic-modal studyroom-setting-modal"
        onClose
        isDim
      >
        <div>수정</div>
        <div>

        </div>
        <div>삭제</div>
      </ModalFrame>
    </>
  );
};

export default StudyRoomSettingModal;

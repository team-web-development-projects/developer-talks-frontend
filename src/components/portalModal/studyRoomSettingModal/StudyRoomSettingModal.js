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

  const deleteroom = async (studyroom) => {
    const data = axios.delete(`${ROOT_API}/study-room/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": auth.accessToken,
      },
    });
    return data;
  };

  // const deleteStudyroom = useMutation(
  //   (studyroom) => axios.delete(`${ROOT_API}/study-room/${id}`, studyroom),
  //   {
  //     onSuccess: (data, variables, context) => {
  //       queryClient.invalidateQueries("studyroom");
  //       queryClient.setQueryData("studyroom-delete", data.data);
  //     },
  //   }
  // );

  const deleteStudyroom = useMutation((studyroom) => deleteroom(studyroom), {
    // 다른 구성 옵션들...
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries("studyroom");
      queryClient.setQueryData("studyroom-delete", data.data);
      setModal(true);
    },
  });

  const deleteRoom = () => {
    // if (window.confirm("Are you sure you want to proceed?")) {
    //   deleteStudyroom.mutate();
    // } else {
    //   setConfirmState(false);
    // }
    setModal(true);
  };

  useEffect(() => {
    deleteStudyroom.mutate();
  }, [confirmState, deleteStudyroom]);

  // useEffect(() => {
  //   if (confirmState) {
  //     axios
  //       .delete(`${ROOT_API}/study-room/${id}`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-AUTH-TOKEN": auth.accessToken,
  //         },
  //       })
  //       .then(function (response) {
  //         console.log("스터디 룸 정보 성공:", response);
  //         Navigate("/studyroom");
  //       })
  //       .catch(function (error) {
  //         console.log("스터디 룸 정보:실패 ", error.response);
  //       });
  //   }
  // }, [confirmState, auth.accessToken, id]);

  return (
    <>
      {modal && (
        <BasicModal setOnModal={() => setModal()}>
          삭제할래?
          <br />
          <button onClick={() => setConfirmState(true)}>네</button>
          <br />
          <button>아니오</button>
        </BasicModal>
      )}
      <ModalFrame
        setOnModal={setOnModal}
        classname="basic-modal studyroom-setting-modal"
        onClose
        isDim
      >
        <div>수정</div>
        <div onClick={deleteRoom}>삭제</div>
      </ModalFrame>
    </>
  );
};

export default StudyRoomSettingModal;

import React from "react";
import s from "./showuserinfo.module.scss";
import { useState, useRef } from "react";
import DropDown from "components/dropdown/DropDown";
import MessageForm from "components/message/messageForm/MessageForm";
import classname from "classnames";
import axios from "axios";
import { ROOT_API } from "constants/api";
import { showToast } from "components/toast/showToast";
import { useNavigate } from "react-router-dom";
import MessageModal from "components/portalModal/messagemodal/MessageModal";
import { useOutOfClick } from "hooks/useOutOfClick";
import { Modal } from "components/portalModal/Modal";
import { getUserInfo, postUserReport } from "api/user";
import ReportModal from 'components/portalModal/reportmodal/ReportModal';
// import { useEffect } from "react";
const ShowUserInfo = ({ userinfo, type }) => {
  const [datas, setDatas] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalReport, setModalReport] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const targetRef = useRef(null);
  let navigate = useNavigate();

  const viewUserInfo = async (e) => {
    console.log("nick", userinfo.nickname);
    const res = getUserInfo(userinfo.nickname);
    res
      .then((response) => {
        console.log("cc", response);
        if (response) {
          showToast("success", "😎 유저가 비공개인 상태입니다.");
        } else {
          navigate(`/showuser`, { state: userinfo });
        }
      })
      .catch((error) => {
        showToast("error", error.response.data.message);
      });
  };

  const handleReport = async (e) => {
    //const res = postUserReport(userinfo.nickname, reportType, detail);
  };

  useOutOfClick(targetRef, () => {
    setDropdown(false);
  });

  return (
    <>
      <span
        className={classname(`${s.nick} ${type}`, {
          [s.is_detail]: type === "detail",
        })}
        onClick={(e) => {
          e.stopPropagation();
          setDropdown(!dropdown);
        }}
      >
        {userinfo.nickname}
        {dropdown && (
          <div ref={targetRef}>
            <DropDown>
              <li onClick={viewUserInfo}>유저정보보기</li>
              <li onClick={() => setModal(!modal)}>쪽지보내기</li>
              <li onClick={()=>setModalReport(!modalReport)}>신고하기</li>
            </DropDown>
          </div>
        )}
      </span>
      {modal && (
        <MessageModal
          setOnModal={() => setModal()}
          dimClick={() => false}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Modal.Content>
            <MessageForm setDatas={setDatas} userinfo={userinfo} setOnModal={() => setModal()} type="message-in-modal" />
          </Modal.Content>
        </MessageModal>
      )}
      {modalReport && (
        <MessageModal
          setOnModal={() => setModalReport()}
          dimClick={() => false}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Modal.Content>
            <ReportModal setOnModal={setModalReport} userinfo={userinfo} type="user"></ReportModal>
          </Modal.Content>
        </MessageModal>
      )}
    </>
  );
};

export default ShowUserInfo;

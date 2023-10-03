import { getUserInfo } from "api/user";
import classname from "classnames";
import DropDown from "components/dropdown/DropDown";
import MessageForm from "components/message/messageForm/MessageForm";
import { Modal } from "components/portalModal/Modal";
import MessageModal from "components/portalModal/messagemodal/MessageModal";
import ReportModal from "components/portalModal/reportmodal/ReportModal";
import { showToast } from "components/toast/showToast";
import { useOutOfClick } from "hooks/useOutOfClick";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import s from "./showuserinfo.module.scss";
import { SET_PAGING } from "store/PagiNation";
// import { useEffect } from "react";
const ShowUserInfo = ({ userinfo, type }) => {
  const auth = useSelector((state) => state.authToken);
  const pageNumber = useSelector((state) => state.paginationStore);
  const [modal, setModal] = useState(false);
  const [modalReport, setModalReport] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const targetRef = useRef(null);
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const viewUserInfo = async (e) => {
    const res = getUserInfo(userinfo.nickname);
    res
      .then((response) => {
        if (response) {
          showToast("success", "😎 유저가 비공개인 상태입니다.");
        } else {
          navigate(`/user/recent/${userinfo.nickname}`, { state: userinfo });
        }
      })
      .catch((error) => {
        showToast("error", error.response.data.message);
      });
  };

  useOutOfClick(targetRef, () => {
    setDropdown(false);
  });

  // 배포 테스트

  return (
    <>
      <span
        className={classname(`${s.nick} ${type}`, {
          [s.is_detail]: type === "detail",
          [s.is_reply]: type === "reply",
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
              <li
                onClick={() => {
                  auth.accessToken ? setModal(!modal) : toast.error("로그인 후 이용해주세요");
                }}
              >
                쪽지보내기
              </li>
              <li
                onClick={() => {
                  auth.accessToken ? setModalReport(!modalReport) : toast.error("로그인 후 이용해주세요");
                }}
              >
                신고하기
              </li>
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
            <MessageForm userinfo={userinfo} setOnModal={() => setModal()} type="message-in-modal" />
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

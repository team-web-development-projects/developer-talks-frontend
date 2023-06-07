import axios from "axios";
import classNames from "classnames";
import Button from "components/button/Button";
import { ROOT_API } from "constants/api";
import { getUer } from "hooks/useAuth";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import ModalFrame from "../ModalFrame";
import "./studyroompersonmodal.scss";

const StudyRoomPersonModal = ({ setOnModal, modalUserData, roomId }) => {
  const auth = useSelector((state) => state.authToken);
  const { getNickname } = getUer(auth.accessToken);

  // 내보내기
  const getOut = (nickname) => {
    // 정말 내보낼지 확인하기
    axios
      .delete(`${ROOT_API}/study-room/expel/${roomId}/${nickname}`, {
        params: {
          studyRoomId: roomId,
          nickname: nickname,
        },
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("강퇴되었습니다.");
      })
      .catch((error) => console.log(error));
  };

  // 방나가기
  const selfOut = () => {
    axios
      .delete(`${ROOT_API}/study-room/exit/${roomId}`, {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("방을 나갔습니다.");
      })
      .catch((error) => console.log(error));
  };

  const buttonType = (data, index) => {
    const result = data.filter((item) => item.nickname === getNickname && item.studyRoomLevel === "LEADER");
    if (result.length === 1) {
      return (
        <Fragment>
          <Button size="small" classname="btn-out" onClick={() => getOut(data[index].nickname)}>
            강퇴
          </Button>
          <Button size="small" classname="btn-power">
            권한
          </Button>
        </Fragment>
      );
    }
  };

  return (
    <ModalFrame setOnModal={setOnModal} classname="basic-modal studyroom-user-modal" onClose isDim>
      인원 관리
      <ul>
        {modalUserData.map((item, index) => (
          <li key={index} className="user-list">
            <div>{item.nickname}</div>
            <div
              className={classNames("btn-wrap", {
                "is-my": item.nickname === getNickname,
              })}
            >
              {buttonType(modalUserData, index)}
              {item.nickname === getNickname && (
                <Button classname="btn-outroom" size="small" onClick={selfOut}>
                  나가기
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </ModalFrame>
  );
};

export default StudyRoomPersonModal;

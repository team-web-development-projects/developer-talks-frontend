import axios from "axios";
import classNames from "classnames";
import Button from "components/button/Button";
import { ROOT_API } from "constants/api";
import { getUer } from "hooks/useAuth";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import ModalFrame from "../ModalFrame";
import "./studyroompersonmodal.scss";
import { asignJoinUserApi, deleteUser, getJoinedUserApi, roomAuthApi, selfRoomOutApi } from "api/user";
import { useQueryClient, useQuery } from "react-query";
import { getStudyroomInfoList } from "api/studyroom";

const StudyRoomPersonModal = ({ setOnModal, roomId }) => {
  const auth = useSelector((state) => state.authToken);
  const queryClient = useQueryClient();
  const { getNickname } = getUer(auth.accessToken);

  const { data, isSuccess } = useQuery({
    queryKey: ["joinedRoomPersons"],
    queryFn: () => getStudyroomInfoList(roomId),
  });

  // 내보내기
  const getOut = (nickname) => {
    const res = deleteUser(roomId, nickname);
    // 정말 내보낼지 확인하기
    res
      .then((response) => {
        alert("강퇴되었습니다.");
        queryClient.invalidateQueries(["joinedRoomPersons"]);
      })
      .catch((error) => console.log(error));
  };

  // 방나가기
  const selfOut = () => {
    const res = selfRoomOutApi(roomId);
    res
      .then((response) => {
        alert("방을 나갔습니다.");
        queryClient.invalidateQueries(["getRequestRoom", "getMyJoindRoom"]);
      })
      .catch((error) => console.log(error));
  };

  // 승인 or 거부
  const accept = (userId, status) => {
    // console.log("11acc", roomId, userId, status, auth.accessToken);
    const res = asignJoinUserApi(roomId, userId, status);
    res
      .then((response) => {
        queryClient.invalidateQueries(["joinedRoomPersons"]);
      })
      .catch((error) => console.log(error));
  };

  // 권한
  const roomAuth = (userId, value) => {
    const res = roomAuthApi(roomId, userId, value);
    res
      .then((response) => {
        alert("권한이 변경되었습니다");
        queryClient.invalidateQueries(["joinedRoomPersons"]);
      })
      .catch((error) => console.log(error));
  };

  const selectList = ["NORMAL", "SUB_LEADER"];
  const [Selected, setSelected] = useState("");

  const handleSelect = (e, id) => {
    // setSelected(e.target.value);
    console.log("e", e.target.value);
    roomAuth(id, e.target.value);
  };

  const buttonType = (data, index) => {
    const isLeader = data.filter((item) => item.nickname === getNickname && item.studyRoomLevel === "LEADER");
    return (
      <>
        {data[index].status &&
          (data[index].studyRoomLevel === "NORMAL" || data[index].studyRoomLevel === "SUB_LEADER") && (
            // 내가 방장일때,
            <Button size="small" classname="btn-out" onClick={() => getOut(data[index].nickname)}>
              강퇴
            </Button>
          )}
        {data[index].status && isLeader.length !== 0 && (
          // <Button size="small" classname="btn-power auth" onClick={() => roomAuth(data[index].id)}>
          //   권한
          // </Button>
          <>
            <select name="" id="" onChange={(e) => handleSelect(e, data[index].id)} value={data[index].studyRoomLevel}>
              <option value="LEADER">방장</option>
              <option value="SUB_LEADER">부방장</option>
              <option value="NORMAL">일반</option>
            </select>
          </>
        )}
        {!data[index].status && isLeader.length !== 0 && (
          <>
            <Button size="small" classname="btn-power" onClick={() => accept(data[index].id, true)}>
              승인
            </Button>
            <Button size="small" classname="btn-out" onClick={() => accept(data[index].id, false)}>
              거부
            </Button>
          </>
        )}
      </>
    );
  };

  return (
    <ModalFrame setOnModal={setOnModal} classname="basic-modal studyroom-user-modal" onClose isDim>
      인원 관리
      <ul>
        {isSuccess &&
          data.studyRoomUsers.map((item, index) => (
            <li key={index} className="user-list">
              <div>
                {item.nickname} {item.nickname === getNickname && <span className="me">나</span>}
              </div>
              <div
                className={classNames("btn-wrap", {
                  "is-my": item.nickname === getNickname,
                })}
              >
                {buttonType(data.studyRoomUsers, index)}
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

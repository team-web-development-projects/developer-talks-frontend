import axios from "axios";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import Tag from "components/tag/Tag";
import { ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import { useState } from "react";
import { BsGearFill, BsLock, BsUnlock } from "react-icons/bs";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import "./studyroominfo.scss";
import StudyRoomSettingModal from "components/portalModal/studyRoomSettingModal/StudyRoomSettingModal";
import { useEffect } from "react";
import { useRef } from "react";

const StudyRoomInfo = () => {
  const { postId } = useParams();
  const auth = useSelector((state) => state.authToken);
  const [secretModal, setecretModal] = useState(false);
  const [inModal, setInModal] = useState(false);
  const [settingModal, setSettingModal] = useState(false);

  // 스터디룸 가입요청
  const requestRoom = () => {
    // setecretModal(true);
    axios
      .post(
        `${ROOT_API}/study-room/join/${postId}`,
        {
          id: postId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": auth.accessToken,
          },
        }
      )
      .then(function (response) {
        console.log("스터디 룸 정보 성공:", response);
      })
      .catch(function (error) {
        console.log("스터디 룸 정보:실패 ", error.response);
      });
  };

  async function getInfo() {
    console.log("d11d", postId);
    const { data } = await axios.get(`${ROOT_API}/study-room/${postId}`, {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": auth.accessToken,
      },
    });
    return data;
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: [],
    queryFn: getInfo,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="study-room-info">
      {secretModal && (
        <BasicModal setOnModal={() => setecretModal()}>
          생성자의 승인 후 입장할 수 있는 스터디룸입니다.
          <br />
          승인 요청 하시겠나요?
          <button onClick={requestRoom}>요청하기</button>
          <button onClick={() => setecretModal(false)}>돌아가기</button>
        </BasicModal>
      )}
      {inModal && (
        <BasicModal setOnModal={() => setInModal()}>
          생성자의 승인 없이 입장할 수 있는 스터디룸입니다.
          <br />
          바로 입장 하시겠나요?
          <button onClick={() => Navigate(`/studyroom/${postId}`)}>
            입장하기
          </button>
          <button onClick={() => setInModal(false)}>돌아가기</button>
        </BasicModal>
      )}
      {settingModal && (
        <StudyRoomSettingModal
          setOnModal={() => setSettingModal()}
          id={postId}
        />
      )}
      {data && (
        <>
          {parseJwt(auth.accessToken).nickname ===
            data.studyRoomUsers[0].nickname && (
            <div className="setting" onClick={() => setSettingModal(true)}>
              <BsGearFill size={22} />
            </div>
          )}
          <div className="title">
            {data.title}
            <div className="autojoin">
              {data.autoJoin ? <BsUnlock size={18} /> : <BsLock size={18} />}
              <span onClick={requestRoom}>참여하기</span>
            </div>
          </div>
          <div className="maker">{data.studyRoomUsers[0].nickname}</div>
          <div className="tag">
            {data.skills.map((item, index) => (
              <Tag className="tags" key={index}>
                {item}
              </Tag>
            ))}
          </div>
          <div className="content">
            <div className="desc">스터디 소개</div>
            <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
          </div>
        </>
      )}
    </div>
  );
};

export default StudyRoomInfo;

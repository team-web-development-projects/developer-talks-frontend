import axios from "axios";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import Tag from "components/tag/Tag";
import { ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import { useState } from "react";
import { BsGearFill, BsLock, BsUnlock } from "react-icons/bs";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./studyroominfo.scss";
import StudyRoomSettingModal from "components/portalModal/studyRoomSettingModal/StudyRoomSettingModal";
import { useEffect } from "react";
import { getUer } from "hooks/useAuth";

const StudyRoomInfo = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authToken);
  const [secretModal, setSecretModal] = useState(false);
  const [inModal, setInModal] = useState(false);
  const [settingModal, setSettingModal] = useState(false);
  const { getNickname } = getUer(auth.accessToken);
  const queryClient = useQueryClient();
  const [getDeta, setGetData] = useState();

  // 스터디룸 가입요청
  const requestRoom = () => {
    axios
      .post(
        `${ROOT_API}/study-rooms/join/${postId}`,
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
        if (!data.autoJoin) {
          setSecretModal(false);
          alert("요청이 완료되었습니다.");
        }
      })
      .catch(function (error) {
        console.log("스터디 룸 정보:실패 ", error.response);
      });
  };

  const InRoom = () => {
    // 자동참여일때,
    if (data.autoJoin) {
      setInModal(true);
    }
    if (!data.autoJoin) {
      if (getNickname === data.studyRoomUsers[0].nickname) {
        // setInModal(true);
        requestRoom();
        navigate(`/studyroom/${postId}`);
      } else {
        setSecretModal(true);
      }
    }
  };

  async function getInfo() {
    const { data } = await axios.get(`${ROOT_API}/study-rooms/${postId}`, {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": auth.accessToken,
      },
    });
    return data;
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: [""],
    queryFn: getInfo,
  });

  if (isLoading) return <div>Loading...</div>;

  const lockIcon = () => {
    if (getDeta) {
      return getDeta.autoJoin ? <BsUnlock size={18} /> : <BsLock size={18} />;
    }
    if (data) {
      return data.autoJoin ? <BsUnlock size={18} /> : <BsLock size={18} />;
    }
  };

  return (
    <div className="study-room-info">
      {secretModal && (
        <BasicModal setOnModal={() => setSecretModal()}>
          생성자의 승인 후 입장할 수 있는 스터디룸입니다.
          <br />
          승인 요청 하시겠나요?
          <button onClick={requestRoom}>요청하기</button>
          <button onClick={() => setSecretModal(false)}>돌아가기</button>
        </BasicModal>
      )}
      {inModal && (
        <BasicModal setOnModal={() => setInModal()}>
          생성자의 승인 없이 입장할 수 있는 스터디룸입니다.
          <br />
          바로 입장 하시겠나요?
          <button
            onClick={() => {
              requestRoom();
              navigate(`/studyroom/${postId}`);
            }}
          >
            입장하기
          </button>
          <button onClick={() => setInModal(false)}>돌아가기</button>
        </BasicModal>
      )}
      {settingModal && (
        <StudyRoomSettingModal
          setOnModal={() => setSettingModal()}
          data={data && data}
          id={postId}
          setGetData={setGetData}
          dimClick={() => setSettingModal()}
        />
      )}
      {data && (
        <>
          {parseJwt(auth.accessToken).nickname === data.studyRoomUsers[0].nickname && (
            <div className="setting" onClick={() => setSettingModal(true)}>
              <BsGearFill size={22} />
            </div>
          )}
          <div className="title">
            {getDeta ? getDeta.title : data.title}
            <div className="autojoin">
              {lockIcon()}
              <span onClick={InRoom}>참여하기</span>
            </div>
          </div>
          <div className="maker">{getDeta ? getDeta.studyRoomUsers[0].nickname : data.studyRoomUsers[0].nickname}</div>
          <div className="tag">
            {getDeta
              ? getDeta.skills.map((item, index) => (
                  <Tag className="tags" key={index}>
                    {item}
                  </Tag>
                ))
              : data.skills.map((item, index) => (
                  <Tag className="tags" key={index}>
                    {item}
                  </Tag>
                ))}
          </div>
          <div className="content">
            <div className="desc">스터디 소개</div>
            <div dangerouslySetInnerHTML={{ __html: getDeta ? getDeta.title : data.content }}></div>
          </div>
        </>
      )}
    </div>
  );
};

export default StudyRoomInfo;

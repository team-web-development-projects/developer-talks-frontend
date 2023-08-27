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
import { Modal } from "components/portalModal/Modal";
import Button from "components/button/Button";
import apiInstance from "module/useInterceptor";
import { getStudyroomInfoList, joinStudyroom } from "api/studyroom";

const StudyRoomInfo = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authToken);
  const [secretModal, setSecretModal] = useState(false);
  const [inModal, setInModal] = useState(false);
  const [settingModal, setSettingModal] = useState(false);

  // 스터디룸 가입요청
  const requestRoom = () => {
    const join = joinStudyroom(postId);
    join.then((res) => {
      console.log("cc");
      if (!data.autoJoin) {
        setSecretModal(false);
        alert("요청이 완료되었습니다.");
      }
    });
  };

  const InRoom = () => {
    // 자동참여일때,
    if (data.res.autoJoin) {
      setInModal(true);
    }
    if (!data.res.autoJoin) {
      if (parseJwt(auth.accessToken).nickname === data.res.studyRoomUsers[0].nickname) {
        navigate(`/studyroom/${postId}`);
      } else {
        setSecretModal(true);
      }
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getStudyroomInfoList"],
    queryFn: () => getStudyroomInfoList(postId),
  });

  const lockIcon = () => {
    if (data) {
      return data.res.autoJoin ? <BsUnlock size={18} /> : <BsLock size={18} />;
    }
    if (data) {
      return data.res.autoJoin ? <BsUnlock size={18} /> : <BsLock size={18} />;
    }
  };

  return (
    <>
      {auth.accessToken !== null && (
        <div className="study-room-info">
          {secretModal && (
            <BasicModal setOnModal={() => setSecretModal()}>
              <Modal.Content>
                생성자의 승인 후 입장할 수 있는 스터디룸입니다.
                <br />
                승인 요청 하시겠나요?
              </Modal.Content>
              <Modal.Buttons>
                <Button onClick={requestRoom} size="small">
                  요청하기
                </Button>
                <Button onClick={() => setSecretModal(false)} size="small" theme="cancle">
                  돌아가기
                </Button>
              </Modal.Buttons>
            </BasicModal>
          )}
          {inModal && (
            <BasicModal setOnModal={() => setInModal()}>
              <Modal.Content>생성자의 승인 없이 입장할 수 있는 스터디룸입니다.</Modal.Content>
              <Modal.Buttons>
                <Button
                  size="small"
                  onClick={() => {
                    requestRoom();
                    navigate(`/studyroom/${postId}`);
                  }}
                >
                  입장하기
                </Button>
                <Button size="small" theme="cancle" onClick={() => setInModal(false)}>
                  돌아가기
                </Button>
              </Modal.Buttons>
            </BasicModal>
          )}
          {settingModal && (
            <StudyRoomSettingModal
              setOnModal={() => setSettingModal()}
              data={data && data.res}
              id={postId}
              setGetData={data.res}
              dimClick={() => setSettingModal()}
            />
          )}
          {data && (
            <>
              {parseJwt(auth.accessToken).nickname === data.res.studyRoomUsers[0].nickname && (
                <div className="setting" onClick={() => setSettingModal(true)}>
                  <BsGearFill size={22} />
                </div>
              )}
              <div className="title">
                {data.res.title}
                <div className="autojoin">
                  {lockIcon()}
                  <span onClick={InRoom}>참여하기</span>
                </div>
              </div>
              <div className="maker">{data.res.studyRoomUsers[0].nickname}</div>
              <div className="tag">
                {data.res.skills.map((item, index) => (
                  <Tag className="tags" key={index}>
                    {item}
                  </Tag>
                ))}
              </div>
              <div className="content">
                <div className="desc">스터디 소개</div>
                <div dangerouslySetInnerHTML={{ __html: data.res.content }}></div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default StudyRoomInfo;

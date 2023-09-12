import { useState } from "react";
import { useParams } from "react-router-dom";
import "./studyroomdetail.scss";
// import { io } from "socket.io-client";
import { getStudyroomInfoList } from "api/studyroom";
import Chat from "components/chat/Chat";
import ChatList from "components/chat/ChatList";
import StudyRoomSettingModal from "components/portalModal/studyRoomSettingModal/StudyRoomSettingModal";
import { parseJwt } from "hooks/useParseJwt";
import { BsGearFill } from "react-icons/bs";
import { useQuery } from "react-query";
import InStudyRoomBoard from "../inStudyRoomBoard/InStudyRoomBoard";
import { useSelector } from "react-redux";

const StudyRoomDetail = () => {
  const { postId } = useParams();
  const auth = useSelector((state) => state.authToken);
  const [upText, setUpText] = useState([{}]);
  const [settingModal, setSettingModal] = useState(false);

  const { data, isSuccess } = useQuery({
    queryKey: ["getStudyroomInfoList"],
    queryFn: () => getStudyroomInfoList(postId),
  });

  console.log('dc', data);

  return (
    <>
      {settingModal && (
        <StudyRoomSettingModal
          setOnModal={() => setSettingModal()}
          data={data && data}
          id={postId}
          setGetData={data}
          dimClick={() => setSettingModal()}
        />
      )}
      {isSuccess && parseJwt(auth.accessToken).nickname === data.studyRoomUsers[0].nickname && (
        <div className="setting" onClick={() => setSettingModal(true)}>
          <BsGearFill size={22} />
        </div>
      )}
      <div className="room-detail">
        <div className="menu">
          <div className="board">
            <InStudyRoomBoard postId={postId} />
          </div>
          <div className="content">
            <ChatList postId={postId} upText={upText} />
            <Chat postId={postId} setUpText={setUpText} upText={upText} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudyRoomDetail;

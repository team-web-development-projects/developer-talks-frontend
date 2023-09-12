import axios from "axios";
import classNames from "classnames";
import DropDown from "components/dropdown/DropDown";
import Pagination from "components/pagination/Pagination";
import StudyRoomPersonModal from "components/portalModal/studyRoomPersonModal/StudyRoomPersonModal";
import { ROOT_API } from "constants/api";
import { getUer } from "hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MypageContent from "../../MyPageContent";
import s from "../../mypagecontent.module.scss";
import mystudy from "./mystudyroom.module.scss";
import { useQueries, useQuery, useQueryClient } from "react-query";
import { asignJoinUserApi, getJoinedUser, getJoinedUserApi, getRequestsRoomApi, getUserInfo } from "api/user";
import { useOutOfClick } from "hooks/useOutOfClick";
import { showToast } from "components/toast/showToast";

const MyStudyRoom = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authToken);
  const pageNumber = useSelector((state) => state.paginationStore);
  const targetRef = useRef(null);
  const queryClient = useQueryClient();
  const { getNickname } = getUer(auth.accessToken);
  const [personModal, setPerseonModal] = useState(false);
  const [roomid, setRoomid] = useState();
  const [drop, setDrop] = useState({
    index: -1,
    state: false,
  });

  const queries = useQueries([
    // 참여요청 스터디룸 리스트
    {
      queryKey: ["getRequestRoom", pageNumber["mystudyroom_request"].item],
      queryFn: () => getRequestsRoomApi(pageNumber["mystudyroom_request"].item),
    },
    // 참여중인 스터디룸 리스트
    {
      queryKey: ["getMyJoindRoom", pageNumber["mystudyroom_joined"].item],
      queryFn: () => getJoinedUserApi(pageNumber["mystudyroom_joined"].item),
    },
  ]);
  const requestRoom = queries[0].data;
  const myJoindRoom = queries[1].data;

  const clickUser = (e, key) => {
    e.stopPropagation();
    if (key === drop.index) {
      setDrop({ ...drop, index: key, state: !drop.state });
    } else {
      setDrop({ ...drop, index: key, state: true });
    }
  };

  useOutOfClick(targetRef, () => {
    setDrop({ ...drop, state: false });
  });

  // 가입승인
  const asignUser = (studyRoomId, studyRoomUserId) => {
    const res = asignJoinUserApi(studyRoomId, studyRoomUserId);
    res.then(function (response) {
      alert("승인 되었습니다.");
      queryClient.invalidateQueries(["getRequestRoom", "getMyJoindRoom"]);
    });
  };

  // 유저정보보기
  const infoUser = (nickname) => {
    const res = getUserInfo(nickname);
    res
      .then((response) => {
        console.log("res", response);
        if (response) {
          showToast("success", "😎 유저가 비공개인 상태입니다.");
        } else {
          navigate(`/showuser`);
        }
      })
      .catch((error) => {
        showToast("error", error.response.data.message);
      });
  };

  // console.log("zxcv", requestRoom);

  const roomUserInfo = (data) => {
    const asigning = data.studyRoomUsers.filter((item) => item.status === false && item.nickname === getNickname);
    const isRoomLeader = data.studyRoomUsers.filter(
      (item) => item.studyRoomLevel === "LEADER" && item.nickname === getNickname
    );
    const isNormal = data.studyRoomUsers.filter(
      (item) => item.studyRoomLevel === "NORMAL" && item.nickname === getNickname
    );
    const isSubLeader = data.studyRoomUsers.filter(
      (item) => item.studyRoomLevel === "SUB_LEADER" && item.nickname === getNickname
    );
    if (asigning.length === 1) {
      return <span className={mystudy.room_list_tag}>승인요청중</span>;
    }
    if (isRoomLeader.length === 1) {
      return <span className={`${mystudy.room_list_tag} ${mystudy.is_Leader}`}>방장</span>;
    }
    if (isSubLeader.length === 1) {
      return <span className={`${mystudy.room_list_tag} ${mystudy.is_subLeader}`}>부방장</span>;
    }
    if (isNormal.length === 1) {
      return <span className={`${mystudy.room_list_tag} ${mystudy.is_normal}`}>일반</span>;
    }
  };

  return (
    <>
      {personModal && <StudyRoomPersonModal setOnModal={() => setPerseonModal()} roomId={roomid} />}
      <div className={classNames([s.contentWrap], [mystudy.mystudyroom])}>
        <section>
          <h3>스터디룸 신청 리스트</h3>
          <ul className={mystudy.list}>
            {requestRoom && requestRoom.content.length !== 0 ? (
              requestRoom.content.map((item, index) => (
                <li key={index} className={mystudy.list_item}>
                  <div className={mystudy.room_title}>{item.title}</div>
                  <span className={mystudy.user} onClick={(e) => clickUser(e, index)} ref={targetRef}>
                    {item.nickname}
                    {drop.index === index && drop.state && (
                      <DropDown>
                        <li onClick={() => asignUser(item.studyRoomId, item.studyRoomUserId)}>승인하기</li>
                        <li onClick={() => infoUser(item.nickname)}>유저정보보기</li>
                      </DropDown>
                    )}
                  </span>
                </li>
              ))
            ) : (
              <>리스트가 없습니다.</>
            )}
          </ul>
          {requestRoom && requestRoom.length !== 0 && (
            <div className={mystudy.pageContainer}>
              <Pagination totalPage={requestRoom.totalPages} name="mystudyroom_request" />
            </div>
          )}
        </section>

        <section>
          <h3>참여중 스터디룸</h3>
          <ul className={mystudy.list}>
            {myJoindRoom && myJoindRoom.length !== 0 ? (
              myJoindRoom.content.map((item, index) => (
                <li
                  key={index}
                  className={mystudy.list_item}
                  onClick={() => {
                    if (
                      item.studyRoomUsers.filter((item) => item.nickname === getNickname && item.status === true)
                        .length === 1
                    ) {
                      navigate(`/studyroom/${item.id}`);
                    } else {
                      alert("승인요청중입니다");
                    }
                  }}
                >
                  <div className={mystudy.list_title}>
                    {item.title}
                    {roomUserInfo(item)}
                  </div>
                  <div className={mystudy.count_wrap}>
                    <div
                      className={mystudy.count}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPerseonModal(true);
                        setRoomid(item.id);
                      }}
                    >
                      <BsFillPeopleFill size={16} />
                      <span>
                        {item.studyRoomUsers.filter((item) => item.status).length}/{item.joinableCount}
                      </span>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <>리스트가 없습니다.</>
            )}
          </ul>
          {myJoindRoom && myJoindRoom.length !== 0 && (
            <div className={mystudy.pageContainer}>
              <Pagination totalPage={myJoindRoom.totalPages} name="mystudyroom_joined" />
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default MyStudyRoom;

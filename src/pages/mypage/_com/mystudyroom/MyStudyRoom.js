import axios from "axios";
import classNames from "classnames";
import DropDown from "components/dropdown/DropDown";
import Pagination from "components/pagination/Pagination";
import StudyRoomPersonModal from "components/portalModal/studyRoomPersonModal/StudyRoomPersonModal";
import { ROOT_API } from "constants/api";
import { getUer } from "hooks/useAuth";
import { useEffect, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MypageContent from "../../MyPageContent";
import s from "../../mypagecontent.module.scss";
import mystudy from "./mystudyroom.module.scss";
import { QueryClient, useQueries, useQuery } from "react-query";
import { asignJoinUserApi, getJoinedUser, getJoinedUserApi, getRequestsRoomApi } from "api/user";

const MyStudyRoom = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authToken);
  const { getNickname } = getUer(auth.accessToken);
  const [personModal, setPerseonModal] = useState(false);
  const [roomid, setRoomid] = useState();
  const [drop, setDrop] = useState({
    index: -1,
    state: false,
  });
  const [currentMyListPage, setCurrentMyListPage] = useState(1);
  const [currentAsignPage, setCurrentAsignPage] = useState(1);

  const queries = useQueries([
    // 참여요청 스터디룸 리스트
    { queryKey: ["getRequestRoom", currentAsignPage], queryFn: () => getRequestsRoomApi(currentAsignPage) },
    // 참여중인 스터디룸 리스트
    { queryKey: ["getMyJoindRoom", currentMyListPage], queryFn: () => getJoinedUserApi(currentMyListPage) },
  ]);
  const requestRoom = queries[0].data;
  const myJoindRoom = queries[1].data;

  // console.log("request", requestRoom, "myjoind", myJoindRoom);

  const asignJoin = () => {
    console.log("가입승인");
  };

  const clickUser = (e, key) => {
    e.stopPropagation();
    if (key === drop.index) {
      setDrop({ ...drop, index: key, state: !drop.state });
    } else {
      setDrop({ ...drop, index: key, state: true });
    }
  };

  // 가입승인
  const asignUser = (studyRoomId, studyRoomUserId) => {
    const res = asignJoinUserApi(studyRoomId, studyRoomUserId);
    res.then(function (response) {
      alert("승인 되었습니다.");
      QueryClient.invalidateQueries(["getRequestRoom", "getMyJoindRoom"]);
    });
  };

  const infoUser = () => {
    console.log("유저정보보기");
  };

  useEffect(() => {
    setCurrentMyListPage(1);
    setCurrentAsignPage(1);
  }, []);

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
      {personModal && (
        <StudyRoomPersonModal
          setOnModal={() => setPerseonModal()}
          roomId={roomid}
          currentMyListPage={currentMyListPage}
        />
      )}
      <div className={classNames([s.contentWrap], [mystudy.mystudyroom])}>
        <section>
          <h3>스터디룸 신청 리스트</h3>
          <ul className={mystudy.list}>
            {requestRoom && requestRoom.content.length !== 0 ? (
              requestRoom.content.map((item, index) => (
                <li onClick={asignJoin} key={index} className={mystudy.list_item}>
                  <div className={mystudy.room_title}>{item.title}</div>
                  <span className={mystudy.user} onClick={(e) => clickUser(e, index)}>
                    {item.nickname}
                    {drop.index === index && drop.state && (
                      <DropDown>
                        <li onClick={() => asignUser(item.studyRoomId, item.studyRoomUserId)}>승인하기</li>
                        <li>유저정보보기</li>
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
              <Pagination
                currentPage={requestRoom.pageable.pageNumber + 1}
                totalPage={requestRoom.totalPages}
                paginate={setCurrentMyListPage}
              />
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
              <Pagination
                currentPage={myJoindRoom.pageable.pageNumber + 1}
                totalPage={myJoindRoom.totalPages}
                paginate={setCurrentMyListPage}
              />
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default MyStudyRoom;

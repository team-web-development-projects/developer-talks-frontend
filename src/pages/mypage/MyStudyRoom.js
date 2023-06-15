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
import MypageContent from "./MyPageContent";
import s from "./mystudyroom.module.scss";

const MyStudyRoom = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authToken);
  const { getNickname } = getUer(auth.accessToken);
  const [personModal, setPerseonModal] = useState(false);
  const [modalUserData, setModalUserData] = useState();
  const [roomid, setRoomid] = useState();
  const [drop, setDrop] = useState({
    index: -1,
    state: false,
  });
  const [asignList, setAsignList] = useState();
  const [myList, setMyList] = useState([]);
  const [currentMyListPage, setCurrentMyListPage] = useState(1);
  const [currentAsignPage, setCurrentAsignPage] = useState(1);

  useEffect(() => {
    // 참여요청 리스트
    axios
      .get(`${ROOT_API}/study-rooms/requests`, {
        params: { page: currentAsignPage - 1, size: 6 },
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then(function (response) {
        setAsignList(response.data);
      });

    // 참여중인 스터디룸 리스트
    axios
      .get(`${ROOT_API}/study-rooms/users`, {
        params: { page: currentMyListPage - 1, size: 6 },
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then(function (response) {
        setMyList(response.data);
      });
  }, [currentAsignPage, currentMyListPage]);

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
    console.log(`${studyRoomId}, ${studyRoomUserId}`);
    axios
      .post(
        `${ROOT_API}/study-rooms/accept/${studyRoomId}/${studyRoomUserId}`,
        {
          studyRoomId: studyRoomId,
          studyRoomUserId: studyRoomUserId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": auth.accessToken,
          },
        }
      )
      .then(function (response) {
        alert("승인 되었습니다.");
        axios
          .get(`${ROOT_API}/study-rooms/requests`, {
            params: { page: currentAsignPage - 1, size: 6 },
            headers: {
              "Content-Type": "application/json",
              "X-AUTH-TOKEN": auth.accessToken,
            },
          })
          .then(function (response) {
            setAsignList(response.data);
          });
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
    if (asigning.length === 1) {
      return <span className={s.room_list_tag}>승인요청중</span>;
    }
    if (isRoomLeader.length === 1) {
      return <span className={s.room_list_tag}>방장</span>;
    }
  };

  return (
    <MypageContent>
      {personModal && (
        <StudyRoomPersonModal setOnModal={() => setPerseonModal()} modalUserData={modalUserData} roomId={roomid} />
      )}
      <div className={classNames("content-wrap", [s.mystudyroom])}>
        <h3>스터디룸 신청 리스트</h3>
        <ul className={s.list}>
          {asignList && asignList.content.length !== 0 ? (
            asignList.content.map((item, index) => (
              <li onClick={asignJoin} key={index} className={s.list_item}>
                <div className={s.room_title}>{item.title}</div>
                <span className={s.user} onClick={(e) => clickUser(e, index)}>
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
        {asignList && asignList.length !== 0 && (
          <div className={s.pageContainer}>
            <Pagination
              currentPage={asignList.pageable.pageNumber + 1}
              totalPage={asignList.totalPages}
              paginate={setCurrentMyListPage}
            />
          </div>
        )}

        <h3>참여중 스터디룸</h3>
        <ul className={s.list}>
          {myList && myList.length !== 0 ? (
            myList.content.map((item, index) => (
              <li
                key={index}
                className={s.list_item}
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
                <div className={s.list_title}>
                  {item.title}
                  {roomUserInfo(item)}
                </div>
                <div className={s.count_wrap}>
                  <div
                    className={s.count}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPerseonModal(true);
                      setModalUserData(myList.content[index].studyRoomUsers);
                      setRoomid(item.id);
                    }}
                  >
                    <BsFillPeopleFill size={16} />
                    <span>
                      {item.joinCount}/{item.joinableCount}
                    </span>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <>리스트가 없습니다.</>
          )}
        </ul>
        {myList && myList.length !== 0 && (
          <div className={s.pageContainer}>
            <Pagination
              currentPage={myList.pageable.pageNumber + 1}
              totalPage={myList.totalPages}
              paginate={setCurrentMyListPage}
            />
          </div>
        )}
      </div>
    </MypageContent>
  );
};

export default MyStudyRoom;

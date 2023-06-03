import React, { useEffect, useState } from "react";
import MypageContent from "./MyPageContent";
import axios from "axios";
import { ROOT_API } from "constants/api";
import { useSelector } from "react-redux";
import s from "./mystudyroom.module.scss";
import DropDown from "components/dropdown/DropDown";
import classNames from "classnames";

const MyStudyRoom = () => {
  const [requestList, setRequestList] = useState([]);
  const [drop, setDrop] = useState({
    index: -1,
    state: false,
  });
  const auth = useSelector((state) => state.authToken);

  console.log("auth", auth);

  useEffect(() => {
    axios
      .get(`${ROOT_API}/study-rooms/requests`, {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then(function (response) {
        console.log("스터디 룸 정보 성공:", response);
        setRequestList(response.data);
      })
      .catch(function (error) {
        console.log("스터디 룸 정보:실패 ", error.response);
      });
  }, []);

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

  const asignUser = (studyRoomId, studyRoomUserId) => {
    console.log(`${studyRoomId}, ${studyRoomUserId}`);
    axios
      .post(
        `${ROOT_API}/study-room/accept/${studyRoomId}/${studyRoomUserId}`,
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
        console.log("스터디 룸 승인완료:", response);
        alert("승인 되었습니다.");
      })
      .catch(function (error) {
        console.log("스터디 룸 정보:실패 ", error.response);
      });
  };

  const infoUser = () => {
    console.log("유저정보보기");
  };

  return (
    <MypageContent>
      <div className={classNames("content-wrap", [s.mystudyroom])}>
        <h3>스터디룸 신청 리스트</h3>
        <ul className={s.list}>
          {requestList &&
            requestList.map((item, index) => (
              <li onClick={asignJoin} key={index} className={s.list_item}>
                <div className={s.room_title}>{item.title}</div>
                <span className={s.user} onClick={(e) => clickUser(e, index)}>
                  {item.nickname}
                  {drop.index === index && drop.state && (
                    <DropDown>
                      <li
                        onClick={() =>
                          asignUser(item.studyRoomId, item.studyRoomUserId)
                        }
                      >
                        승인하기
                      </li>
                      <li>유저정보보기</li>
                    </DropDown>
                  )}
                </span>
              </li>
            ))}
        </ul>
        <h3>참여한 스터디룸</h3>
      </div>
    </MypageContent>
  );
};

export default MyStudyRoom;

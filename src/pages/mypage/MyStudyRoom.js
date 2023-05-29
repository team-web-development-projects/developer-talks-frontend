import Userside from "components/userside/Userside";
import React, { useEffect, useState } from "react";
import MypageContent from "./MyPageContent";
import axios from "axios";
import { ROOT_API } from "constants/api";
import { useSelector } from "react-redux";

const MyStudyRoom = () => {
  const [requestList, setRequestList] = useState([]);
  const auth = useSelector((state) => state.authToken);

  useEffect(() => {
    console.log("dd");
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

  return (
    <MypageContent>
      <div className="notes">
        <h3>스터디룸 신청 리스트</h3>
        <ul>
          {requestList &&
            requestList.map((item) => (
              <li>
                제목 : {item.title} <br />
                신청닉네임: {item.nickname}
              </li>
            ))}
        </ul>
        <h3>참여한 스터디룸</h3>
      </div>
    </MypageContent>
  );
};

export default MyStudyRoom;

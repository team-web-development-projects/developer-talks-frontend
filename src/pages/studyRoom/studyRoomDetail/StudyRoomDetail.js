import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./studyroomdetail.scss";
// import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { ROOT_API } from "constants/api";
import { useInfiniteQuery, useQuery } from "react-query";
import Chat from "components/chat/Chat";
import ChatList from "components/chat/ChatList";
import InStudyRoomBoard from "../inStudyRoomBoard/InStudyRoomBoard";

const StudyRoomDetail = () => {
  const { postId } = useParams();
  const [upText, setUpText] = useState([{}]);

  // console.log("upText:", upText);

  return (
    <div className="room-detail">
      {/* <button onClick={() => res.hasNextPage && res.fetchNextPage()}>다음</button>
      <button onClick={() => res.hasPreviousPage && res.fetchPreviousPage()}>이전</button> */}
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
  );
};

export default StudyRoomDetail;

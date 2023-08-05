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

const StudyRoomDetail = () => {
  const { postId } = useParams();
  const auth = useSelector((state) => state.authToken);
  const [chat, setChat] = useState();
  const [chatList, setChatList] = useState();

  async function getChatList() {
    const { data } = await axios.get(`${ROOT_API}/${postId}/chats`, {
      params: { page: 0, size: 10 },
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": auth.accessToken,
      },
    });
    return data;
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["chatList"],
    queryFn: getChatList,
  });

  console.log("data", data && data.content);

  return (
    <div className="room-detail">
      {/* <button onClick={() => res.hasNextPage && res.fetchNextPage()}>다음</button>
      <button onClick={() => res.hasPreviousPage && res.fetchPreviousPage()}>이전</button> */}
      <div>설정</div>
      <div className="menu">
        <div className="left-menu">
          <ul>
            <li>채팅룸1</li>
            <li>채팅룸2</li>
          </ul>
        </div>
        <div className="content">
          <div className="chat_list">
            {data &&
              data.content &&
              data.content.map((item, i) => (
                <div key={i}>
                  <span className="sender">{item.sender}</span>
                  <span className="message">{item.message}</span>
                  <span className="createDate">{item.createDate}</span>
                </div>
              ))}
          </div>
          <Chat postId={postId} setChat={setChat} />
        </div>
        <div className="right-menu">
          <ul>
            <li>게시판1</li>
            <li>게시판2</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudyRoomDetail;

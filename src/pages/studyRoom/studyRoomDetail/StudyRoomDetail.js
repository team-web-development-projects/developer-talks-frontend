import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./studyroomdetail.scss";
// import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { ROOT_API } from "constants/api";
import { useInfiniteQuery } from "react-query";
import Chat from "components/chat/Chat";

const StudyRoomDetail = () => {
  const { postId } = useParams();
  const auth = useSelector((state) => state.authToken);
  const [chat, setChat] = useState();
  const [chatList, setChatList] = useState();
  const [chatStatus, setChatStatus] = useState(false);
  const [getList, setGetList] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get(`${ROOT_API}/${postId}/chats`, {
  //       params: {
  //         page: 0,
  //         size: 10,
  //       },
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-AUTH-TOKEN": auth.accessToken,
  //       },
  //     })
  //     .then(function (response) {
  //       console.log("챗 데이터:", response.data.content);
  //       setChatList(response.data.content);
  //     })
  //     .catch(function (error) {
  //       console.log("로그인 실패: ", error.response);
  //     });
  //   console.log("getlist", getList);
  //   const timer = setTimeout(() => {
  //     setGetList(false);
  //     setChatStatus(false);
  //   }, 100);

  //   return () => clearTimeout(timer);
  // }, [auth.accessToken, postId, chat, getList, chatStatus]);

  console.log("getList", getList);

  const res = useInfiniteQuery(
    ["infiniteChatData"],
    ({ pageParam = 0 }) =>
      axios.get(`${ROOT_API}/${postId}/chats`, {
        params: {
          page: pageParam,
          size: 10,
        },
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": auth.accessToken,
        },
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        console.log("다음");
        return lastPage.data.page < 10 && lastPage.data.page + 1; // 다음 페이지를 호출할 때 사용 될 pageParam
      },
      getPreviousPageParam: (firstPage, allPages) => {
        console.log("이전");
        return firstPage.data.page > 1 && firstPage.data.page - 1; // 이전 페이지를 호출할 때 사용 될 pageParam
      },
    }
  );

  console.log("res", res.data.pages[0].data.content);

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
            {chatList &&
              chatList.map((item, i) => (
                <div key={i}>
                  <span className="sender">{item.sender}</span>
                  <span className="message">{item.message}</span>
                  <span className="createDate">{item.createDate}</span>
                </div>
              ))}
          </div>
          <Chat postId={postId} setChat={setChat} setGetList={setGetList} setChatStatus={setChatStatus} />
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

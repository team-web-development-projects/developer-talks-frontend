import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
// import Stomp from '@stomp/stompjs';
import Stomp from "stompjs";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const ROOM_SEQ = 1;

const Chat = () => {
  const auth = useSelector((state) => state.authToken);
  const [chatMessages, setChatMessages] = useState([]);
  // const [message, setMessage] = useState("Hello world");
  const sockJS = new SockJS("https://dtalks-api.site/ws/chat");
  console.log("auth", auth.accessToken);
  const headers = {
    "X-AUTH-TOKEN": auth.accessToken,
  };
  const stompClient = Stomp.over(sockJS, { headers });

  useEffect(() => {
    // const stompClient = Stomp.over(socket);
    // const sockJS = new WebSocket("ws://dtalks-api.site/ws/chat"); // WebSocket 서버 주소로 변경해야 합니다.
    // let sockJS = new SockJS("ws://dtalks-api.site/ws/chat");

    // 소켓 연결 시도
    stompClient.connect({}, () => {
      console.log("STOMP 연결됨");

      // 구독
      stompClient.subscribe("/sub/rooms/1", (message) => {
        console.log("메시지 수신:", message);
      });
      sendMessage();
    });
    // 컴포넌트가 언마운트될 때 소켓 연결 정리
    return () => {
      // stompClient.disconnect();
    };
  }, [auth]);

  // sendMessage(); // 예시로 컴포넌트가 마운트될 때 메시지 전송
  const sendMessage = () => {
    const message = "Hello, Server!"; // 전송할 메시지
    // stompClient.send("/pub/rooms/1", {}, message);
    stompClient.send("/pub/rooms/1", {}, JSON.stringify(message));
  };

  return (
    <div>
      {chatMessages && chatMessages.length > 0 && (
        <ul>
          {chatMessages.map((_chatMessage, index) => (
            <li key={index}>{_chatMessage.message}</li>
          ))}
        </ul>
      )}
      <div>
        <input
          type={"text"}
          placeholder={"message"}
          // value={message}
          // onChange={(e) => setMessage(e.target.value)}
          // onKeyPress={(e) => e.which === 13 && publish(message)}
        />
        {/*
      */}
      <button onClick={sendMessage}>send</button>
      </div>
    </div>
  );
};

export default Chat;

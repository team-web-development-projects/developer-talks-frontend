import SockJS from "sockjs-client";
import Stomp from "stompjs";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { SET_ROUTER } from "store/PageRouter";

const Chat3 = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authToken);
  const pageRouter = useSelector((state) => state.pageRouter);
  const [conec, setConnec] = useState(false);

  //socket 연결
  const headers = {
    "X-AUTH-TOKEN": auth.accessToken,
  };
  // const socket = new SockJS("ws://dtalks-api.site/ws/chat");
  const socket = new SockJS("https://dtalks-api.site/ws/chat");
  const stomp = new Stomp.over(socket);

  // const websocket = new WebSocket("https://dtalks-api.site/ws/chat");
  // const stomp = new Stomp.over(websocket);

  useEffect(() => {
    stomp.connect(headers, () => {
      setConnec(true);
      // try {
      //방 생성

      //이벤트 구독
      stomp.subscribe(
        `/sub/rooms/1`,
        (body) => {
          console.log(body);
          //이후 처리
        },
        headers
      );

      // } catch (e) {
      //axios 예외처리
      //axios는 기본적으로 200응답 외에는 에러를 던지므로
      //방 생성 or 방 입장에 관한 api오류시 이곳에서 처리해야함
      // console.log("error: ", e);
      // }
    });
    return () => {
      //연결 끊기
      stomp.disconnect(() => {
        console.log("socket연결 해제");
      });
    };
  }, []);

  const click = () => {
    // connect();
    const message = "Hello, Server!"; // 전송할 메시지
    const body = JSON.stringify("Hello");
    console.log("헤더", auth.accessToken);
    stomp.send(
      "/pub/rooms/1",
      {
        "X-AUTH-TOKEN": auth.accessToken,
      },
      body
      // message
      // JSON.stringify({ message: message })
      // message
      // {
      //   "X-AUTH-TOKEN": auth.accessToken,
      // },
      // JSON.stringify(
      //   // message: message,
      //   message
      // )
    );
  };
  return (
    <div>
      <button onClick={click}>버튼</button>
    </div>
  );
};
export default Chat3;

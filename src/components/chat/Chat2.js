import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useRef } from "react";
import { useSelector } from "react-redux";

const Chat2 = () => {
  const auth = useSelector((state) => state.authToken);
  const client = useRef();

  client.current = Stomp.over(() => {
    const sock = new SockJS("https://dtalks-api.site/ws/chat");
    return sock;
  });
  // setChatMessageList([]);
  client.current.connect(
    {
      "X-AUTH-TOKEN": auth.accessToken,
    },
    () => {
      // (messageList: IChatDetail[]) => {

      client.current.subscribe(
        `/sub/rooms/1`,
        (message) => {
          // setChatMessage(JSON.parse(message.body));
          console.log("dd", message);
        },
        {
          "X-AUTH-TOKEN": auth.accessToken,
        }
      );
    }
  );

  const sendHandler = () => {
    const message = "Hello, Server!"; // 전송할 메시지
    client.current.send(
      "/pub/rooms/1",
      {
        "X-AUTH-TOKEN": auth.accessToken,
      },
      JSON.stringify(message)
    );
  };

  return (
    <div>
      <input type="text" />
      <button onClick={sendHandler}>클릭</button>
    </div>
  );
};

export default Chat2;

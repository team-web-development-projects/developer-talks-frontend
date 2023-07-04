import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import * as StompJs from "@stomp/stompjs";

export default function Chat4() {
  const [isConnected, setIsConnected] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const auth = useSelector((state) => state.authToken);

  const client = useRef({});

  const connect = () => {
    console.log('실행')
    client.current = new StompJs.Client({
      brokerURL: "ws://dtalks-api.site/ws/chat",
      onConnect: () => {
        console.log("success");
        setIsConnected(true);
        subscribe();
      },
      connectHeaders: {
        // 이 부분 새로 추가
        "X-AUTH-TOKEN": auth.accessToken,
      },
    });
    client.current.activate();
  };

  const disconnect = () => {
    // 연결이 끊겼을 때
    client.current.deactivate();
  };

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  const subscribe = () => {
    client.current.subscribe("/sub/rooms/1", (body) => {
      const json_body = JSON.parse(body.body);
    });
  };

  const publish = (chat) => {
    if (!client.current.connected) return; // 연결되지 않았으면 메시지를 보내지 않는다.

    client.current.publish({
      destination: "/pub/rooms/1",
      body: JSON.stringify("dd"), // 형식에 맞게 수정해서 보내야 함.
    });
  };

  return (
    <div>
      <p>Socket 연결 상태: {isConnected ? "연결됨" : "연결되지 않음"}</p>
      {/* 나머지 컴포넌트 내용 */}
      <button onClick={publish}>click</button>
    </div>
  );
}

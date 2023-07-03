import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Chat4() {
  const [isConnected, setIsConnected] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const socket = io("https://dtalks-api.site/ws/chat");

    // Socket 연결 확인
    socket.on("connect", () => {
      setIsConnected(true);
    });

    // SUBSCRIBE 확인
    socket.on("subscribe", () => {
      setIsSubscribed(true);
    });

    // Socket 연결 해제 시 상태 업데이트
    return () => {
      socket.disconnect();
      setIsConnected(false);
      setIsSubscribed(false);
    };
  }, []);

  return (
    <div>
      <p>Socket 연결 상태: {isConnected ? "연결됨" : "연결되지 않음"}</p>
      <p>SUBSCRIBE 상태: {isSubscribed ? "구독됨" : "구독되지 않음"}</p>
      {/* 나머지 컴포넌트 내용 */}
    </div>
  );
}

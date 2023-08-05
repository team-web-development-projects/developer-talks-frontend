import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useQueryClient } from "react-query";
import ChatInput from "./ChatInput";

const Chat = ({ postId, setChat, setGetList, setChatStatus }) => {
  const auth = useSelector((state) => state.authToken);
  const queryClient = useQueryClient();
  const [conec, setConnec] = useState(false);
  const [text, setText] = useState("");
  const [debouncedClick, setDebouncedClick] = useState(null);

  //socket 연결
  const headers = {
    "X-AUTH-TOKEN": auth.accessToken,
  };

  const socket = new SockJS("https://dtalks-api.site/ws/chat");
  const stomp = new Stomp.over(socket);

  useEffect(() => {
    stomp.connect(headers, ({ temp }) => {
      console.log("소켓 연결됨");
      // try {
      //방 생성

      //이벤트 구독
      stomp.subscribe(
        `/sub/rooms/${postId}`,
        (body) => {
          console.log("메시지 받음: ", JSON.parse(body.body).message);
          //이후 처리
          // setGetList(true);
          queryClient.invalidateQueries(["chatList"]);
        },
        headers
      );

      // } catch (e) {
      // axios 예외처리
      // axios는 기본적으로 200응답 외에는 에러를 던지므로
      // 방 생성 or 방 입장에 관한 api오류시 이곳에서 처리해야함
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

  const click = async (e, text) => {
    e.preventDefault();
    // NOTE: 같은 텍스트여도 전송되게
    // setChat(text);
    // setChatStatus(true);

    stomp.send(
      `/pub/rooms/${postId}`,
      {
        "X-AUTH-TOKEN": auth.accessToken,
      },
      JSON.stringify(text)
    );
  };

  return (
    <div>
      <ChatInput setText={setText} onClick={click} text={text} />
    </div>
  );
};
export default Chat;

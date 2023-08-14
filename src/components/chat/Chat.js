import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useQueryClient } from "react-query";
import ChatInput from "./ChatInput";
import { INIT_MESSAGE, SEND_MESSAGE } from "store/ChatStore";

const Chat = ({ postId, upText, setUpText }) => {
  const auth = useSelector((state) => state.authToken);
  const queryClient = useQueryClient();
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const [temps, setTemp] = useState([{}]);

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
          console.log("메시지 받음: ", JSON.parse(body.body));
          // console.log("메시지 받음: ", body.body);
          // setUpText([...upText, JSON.parse(body.body)]);
          dispatch(SEND_MESSAGE(JSON.parse(body.body)));
          // queryClient.invalidateQueries(["chatList"]);
        },
        headers
      );
    });
  }, []);

  useEffect(() => {
    return () => {
      //연결 끊기
      stomp.disconnect(() => {
        console.log("socket연결 해제");
        // NOTE: 소켓 끊어질때 store에 있는거 다 제거하기
        dispatch(INIT_MESSAGE());
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
      <button
        onClick={() => {
          // setTemp([...temps, { id: 1 }]);
          dispatch(SEND_MESSAGE({ id: 1 }));
        }}
      >
        추가
      </button>
      <ChatInput setText={setText} onClick={click} text={text} />
    </div>
  );
};
export default Chat;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const Chat = ({ roomId }) => {
  const auth = useSelector((state) => state.authToken);
  const [conec, setConnec] = useState(false);
  const [text, setText] = useState("");

  //socket 연결
  const headers = {
    "X-AUTH-TOKEN": auth.accessToken,
  };

  const socket = new SockJS("https://dtalks-api.site/ws/chat");
  const stomp = new Stomp.over(socket, { headers });

  useEffect(() => {
    stomp.connect(headers, () => {
      setConnec(true);
      console.log("소켓 연결됨");
      // try {
      //방 생성

      //이벤트 구독
      stomp.subscribe(
        // `/sub/rooms/${roomId}`,
        `/sub/rooms/1`,
        (body) => {
          console.log("body: ", JSON.stringify(body.body).message);
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

  const click = (e) => {
    e.preventDefault();
    // const body = JSON.stringify("Hello");
    console.log("헤더", auth.accessToken);
    stomp.send(
      // `/pub/rooms/${roomId}`,
      `/pub/rooms/1`,
      {
        "X-AUTH-TOKEN": auth.accessToken,
      },
      JSON.stringify(text)
    );
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <form onSubmit={click}>
        <input type="text" name="" id="" onChange={onChange} />
        <button>전송</button>
      </form>
    </div>
  );
};
export default Chat;

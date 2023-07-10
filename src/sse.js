import { ROOT_API } from "constants/api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { useState } from "react";

const Sse = () => {
  const auth = useSelector((state) => state.authToken);
  const EventSource = EventSourcePolyfill || NativeEventSource;
  const [getMessage, setGetMessage] = useState(false);

  useEffect(() => {
    if (auth.accessToken) {
      console.log('토큰있음');
      const sse = new EventSource(`${ROOT_API}/notifications/subscribe`, {
        headers: {
          "X-AUTH-TOKEN": auth.accessToken,
          "Content-Type": "text/event-stream"
        },
        heartbeatTimeout: 2 * 60 * 1000,
        withCredentials: true
      });

      sse.onopen = (event) => {
        if(event.status === 200) {
          console.log('sse 연결됨');
        }
      }

      sse.onmessage = (event) => {
        console.log('sse이벤트 날라옴', event);
        const isJson = (str) => {
          try {
            const json = JSON.parse(str)
            return json && typeof json === 'object'
          } catch(e) {
            return false
          }
        }
        if( isJson(event.data)) {
          setGetMessage(true);
        }
      }

      sse.addEventListener("message", (e) => {
        if (e.type === "message" && e.data.startsWith("{")) {
          // setNewAlert((prev) => [JSON.parse(e.data)]);
          console.log('sse message');
          // queryClient.invalidateQueries("alertList");
        }
      });

      sse.addEventListener("error", (e) => {
        if (e) {
          console.log('sse error', e);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.accessToken]);
}

export default Sse;
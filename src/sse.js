import { ROOT_API } from "constants/api";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ON_NOTI } from "store/Notification";
import { useQueryClient } from "react-query";
import axios from "axios";

const Sse = () => {
  const auth = useSelector((state) => state.authToken);
  const EventSource = EventSourcePolyfill || NativeEventSource;
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [getMessage, setGetMessage] = useState(false);

  useEffect(() => {
    if (auth.accessToken) {
      const sse = new EventSource(`${ROOT_API}/notifications/subscribe`, {
      // const sse = new EventSourcePolyfill(`${ROOT_API}/notifications/subscribe`, {
        headers: {
          "X-AUTH-TOKEN": auth.accessToken,
          "Content-Type": "text/event-stream",
        },
        // heartbeatTimeout: 45000,
        heartbeatTimeout: 4 * 60 * 1000,
        // heartbeatTimeout: 30000,
        withCredentials: true,
      });

      sse.onopen = (event) => {
        if (event.status === 200) {
          // console.log("sse 연결됨");
        }
      };

      sse.onmessage = (event) => {
        const isJson = (str) => {
          try {
            const json = JSON.parse(str);
            return json && typeof json === "object";
          } catch (e) {
            return false;
          }
        };
        if (isJson(event.data)) {
          console.log("sse 메시지 수신됨");
          queryClient.invalidateQueries(["alaram"]);
          queryClient.invalidateQueries(["alaramUnRead"]);
          dispatch(ON_NOTI());
          setGetMessage(true);
        }
      };

      // NOTE: 메시지 추적?
      // sse.addEventListener("message", (e) => {
      //   if (e.type === "message" && e.data.startsWith("{")) {
      //     // setNewAlert((prev) => [JSON.parse(e.data)]);
      //   }
      // });

      // sse.onerror = (event) => {
      //   if (sse !== undefined) {
      //     sse.close();
      //   }
      // };

      // sse.addEventListener("error", (e) => {
      //   if (e) {
      //     console.log("sse error", e);
      //   }
      // });

      if (auth.accessToken === null) {
        sse.close();
      }
    }
     return (sse) => {
      if (!auth.accessToken === null) {
        sse.close();
      }
    }
  }, [auth.accessToken]);
};

export default Sse;

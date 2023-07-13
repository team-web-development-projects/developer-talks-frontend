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

  // const queries = useQueries([
  //   {
  //     queryKey: ["alaram"],
  //     queryFn: () => alarmAll(),
  //     enabled: auth.accessToken !== null,
  //     // staleTime: Infinity,
  //     // cacheTime: 2 * 60 * 1000,
  //     // refetchInterval: 5000,
  //   },
  //   {
  //     queryKey: ["alaramUnRead"],
  //     queryFn: () => alarmUnRead(),
  //     enabled: auth.accessToken !== null,
  //     // staleTime: Infinity,
  //     // cacheTime: 2 * 60 * 1000,
  //     // refetchInterval: 5000,
  //   },
  // ]);

  // console.log("sse: ", queries && queries[0]);

  // async function alarmAll() {
  //   const { data } = await axios.get(`${ROOT_API}/notifications/all`, {
  //     headers: {
  //       // "Content-Type": "application/json",
  //       "Content-Type": "text/event-stream",
  //       "X-AUTH-TOKEN": auth.accessToken,
  //     },
  //   });
  //   return data;
  // }

  // async function alarmUnRead() {
  //   const { data } = await axios.get(`${ROOT_API}/notifications/count`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       // "Content-Type": "text/event-stream",
  //       "X-AUTH-TOKEN": auth.accessToken,
  //     },
  //   });
  //   return data;
  // }

  useEffect(() => {
    if (auth.accessToken) {
      const sse = new EventSource(`${ROOT_API}/notifications/subscribe`, {
        headers: {
          "X-AUTH-TOKEN": auth.accessToken,
          "Content-Type": "text/event-stream",
        },
        heartbeatTimeout: 45000,
        // heartbeatTimeout: 4 * 60 * 1000,
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
          console.log("노티");
          queryClient.invalidateQueries(["alaram"]);
          queryClient.invalidateQueries(["alaramUnRead"]);
          dispatch(ON_NOTI());
          setGetMessage(true);
        }
      };

      sse.addEventListener("message", (e) => {
        if (e.type === "message" && e.data.startsWith("{")) {
          // setNewAlert((prev) => [JSON.parse(e.data)]);
          console.log("sse message");
          // queryClient.invalidateQueries("alertList");
        }
      });

      sse.addEventListener("error", (e) => {
        if (e) {
          console.log("sse error", e);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.accessToken]);
};

export default Sse;

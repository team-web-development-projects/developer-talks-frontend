import axios from "axios";
import { ROOT_API } from "constants/api";
import React, { useState } from "react";
import { useQuery, useQueries, useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import s from "./notification.module.scss";
import Service from "api";

const Notification = () => {
  const auth = useSelector((state) => state.authToken);
  const queryClient = useQueryClient();

  const getAlarmAll = useQuery({
    queryKey: ["alaram"],
    queryFn: () => alarmAll(),
  });

  const getAlarmUnRead = useQuery({
    queryKey: ["alaramUnRead"],
    queryFn: () => alarmUnRead(),
  });

  async function alarmAll() {
    const { data } = await axios.get(`${ROOT_API}/alarm/all`, {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": auth.accessToken,
      },
    });
    return data;
  }

  async function alarmUnRead() {
    const { data } = await axios.get(`${ROOT_API}/alarm/count`, {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": auth.accessToken,
      },
    });
    return data;
  }

  const { isLoading: isPostingTutorial, mutate: allread } = useMutation(
    ["readAll"],
    () =>
      axios.put(
        `${ROOT_API}/post`,
        {},
        {
          headers: { "X-AUTH-TOKEN": auth.accessToken },
        }
      ),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["alaram"]);
      },
    }
  );
  const readAll = (e) => {
    e.stopPropagation();
    console.log("dd");
    allread();
  };

  console.log("data", getAlarmUnRead.data);

  return (
    <div className={s.noti}>
      <div className={s.title}>
        {/* 
      읽지 않은 알림 <span className={s.un_read}>{getAlarmUnRead.data.length}</span>
      <span className={s.all_read} onClick={readAll}>전부 읽음 처리</span>
    */}
      </div>
      <ul>
        {getAlarmAll.isLoading && <li>로딩중입니다..</li>}
        {getAlarmAll.data ? (
          getAlarmAll.data.map((item, i) => (
            <li
              key={i}
              className={classnames("11", {
                [s.is_read]: item.alarmStatus === "READ",
              })}
            >
              <Link to={item.url}>{item.url}</Link>
            </li>
          ))
        ) : (
          <li>알람이 없습니다.</li>
        )}
      </ul>
    </div>
  );
};

export default Notification;

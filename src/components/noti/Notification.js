import axios from "axios";
import { ROOT_API } from "constants/api";
import React, { useState } from "react";
import { useQuery, useQueries, useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import s from "./notification.module.scss";
import Service from "api";
import { useEffect } from "react";

const Notification = ({ unRead, classname }) => {
  const auth = useSelector((state) => state.authToken);
  const queryClient = useQueryClient();

  const queries = useQueries([
    { queryKey: ["alaram"], queryFn: () => alarmAll() },
    { queryKey: ["alaramUnRead"], queryFn: () => alarmUnRead() },
  ]);
  const getAlarmAll = queries[0];
  const getAlarmUnRead = queries[1];

  // 모든 알람
  async function alarmAll() {
    const { data } = await axios.get(`${ROOT_API}/notifications/all`, {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": auth.accessToken,
      },
    });
    return data;
  }

  // 읽지 않은 알람
  async function alarmUnRead() {
    const { data } = await axios.get(`${ROOT_API}/notifications/count`, {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": auth.accessToken,
      },
    });
    return data;
  }

  // 알람 모두 읽기
  const { isLoading: isLoadingAllREad, mutate: allread } = useMutation(
    ["readAll"],
    () =>
      axios.post(
        `${ROOT_API}/notifications/read/all`,
        {},
        {
          headers: { "X-AUTH-TOKEN": auth.accessToken },
        }
      ),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["alaram"]);
        queryClient.invalidateQueries(["alaramUnRead"]);
      },
    }
  );
  const readAll = (e) => {
    e.stopPropagation();
    allread();
  };

  // 특정 알람 삭제
  const { isLoading: isLoadingIdDelete, mutate: idDelete } = useMutation(
    ["deleteId"],
    (id) =>
      axios.delete(`${ROOT_API}/notifications/${id}`, {
        headers: { "X-AUTH-TOKEN": auth.accessToken },
      }),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["alaram"]);
        queryClient.invalidateQueries(["alaramUnRead"]);
      },
    }
  );
  const deleteId = (e, id) => {
    e.stopPropagation();
    idDelete(id);
  };

  // 특정 알람 읽음처리
  const { mutate: idRead } = useMutation(
    ["readId"],
    (id) =>
      axios.post(`${ROOT_API}/notifications/read/${id}`, {}, {
        headers: { "X-AUTH-TOKEN": auth.accessToken },
      }),
    {
      onSuccess: (res) => {
        // setUnread(getAlarmAll.data);
        console.log("res", res);
        queryClient.invalidateQueries(["alaram"]);
        queryClient.invalidateQueries(["alaramUnRead"]);
      },
    }
  );
  const readId = (e, id) => {
    e.stopPropagation();
    idRead(id);
  };

  console.log("dd", getAlarmAll.data, getAlarmUnRead.data);

  return (
    <div
      className={classnames(s.noti, {
        [s.is_show]: classname === "is_show",
      })}
    >
      <div className={s.title}>
        읽지 않은 알림 <span className={s.un_read}>{getAlarmUnRead && getAlarmUnRead.data}</span>
        <span className={s.all_read} onClick={readAll}>
          모두 읽음으로 표시
        </span>
        {/*
         */}
      </div>
      <ul>
        {getAlarmAll.isLoading && <li>로딩중입니다..</li>}
        {getAlarmAll.data && getAlarmAll.data.length !== 0 ? (
          getAlarmAll.data.map((item, i) => (
            <li
              key={i}
              className={classnames("", {
                [s.is_read]: item.readStatus === "READ",
              })}
            >
              <Link to={item.url}>{item.url}</Link>
              <span className={s.ctl}>
                <span onClick={(e) => readId(e, item.id)} className={s.read_log}>
                  읽음 표시
                </span>
                <span onClick={(e) => deleteId(e, item.id)} className={s.delete_log}>
                  삭제
                </span>
              </span>
            </li>
          ))
        ) : (
          <li className={s.not_alarm}>알람이 없습니다.</li>
        )}
      </ul>
    </div>
  );
};

export default Notification;

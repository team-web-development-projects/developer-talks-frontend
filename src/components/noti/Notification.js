import axios from "axios";
import { ROOT_API } from "constants/api";
import React, { useState } from "react";
import { useQuery, useQueries, useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import s from "./notification.module.scss";
import Service from "api";
import { useEffect } from "react";
import { OFF_NOTI, ON_NOTI } from "store/Notification";

const Notification = ({ unRead, classname }) => {
  const auth = useSelector((state) => state.authToken);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState();

  const queries = useQueries([
    {
      queryKey: ["alaram"],
      queryFn: () => alarmAll(),
      enabled: auth.accessToken !== null,
    },
    {
      queryKey: ["alaramUnRead"],
      queryFn: () => alarmUnRead(),
      enabled: auth.accessToken !== null,
    },
  ]);
  const getAlarmAll = queries[0];
  const getAlarmUnRead = queries[1];

  // 모든 알람
  async function alarmAll() {
    const { data } = await axios.get(`${ROOT_API}/notifications/all`, {
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "text/event-stream",
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
        // "Content-Type": "text/event-stream",
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

  const Offnoti = (e) => {
    e.stopPropagation();
    dispatch(OFF_NOTI());
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
      axios.post(
        `${ROOT_API}/notifications/read/${id}`,
        {},
        {
          headers: { "X-AUTH-TOKEN": auth.accessToken },
        }
      ),
    {
      onSuccess: (res) => {
        // setUnread(getAlarmAll.data);
        queryClient.invalidateQueries(["alaram"]);
        queryClient.invalidateQueries(["alaramUnRead"]);
      },
    }
  );
  const readId = (e, id) => {
    e.stopPropagation();
    idRead(id);
  };

  // console.log("dd", getAlarmAll.data, getAlarmUnRead.data);
  // console.log("AlarmAll: ", getAlarmAll.isSuccess && getAlarmAll.data);
  const FilterData = (e, type) => {
    e.stopPropagation();
    console.log('나이');
    if(type === 'all') {
      setFilteredData(getAlarmAll.data);
    }
    if(type === 'read') {

    }
  }

  useEffect(() => {
    if (getAlarmUnRead && getAlarmUnRead.data === 0) {
      // console.log("없음");
      dispatch(OFF_NOTI());
    } else {
      // console.log("있음");
      dispatch(ON_NOTI());
    }
  }, [dispatch, getAlarmUnRead]);

  return (
    <div
      className={classnames(s.noti, {
        [s.is_show]: classname === "is_show",
      })}
    >
      <div className={s.title}>
        읽지 않은 알림 <span className={s.un_read}>{getAlarmUnRead && getAlarmUnRead.data}</span>
        <span
          className={s.all_read}
          onClick={(e) => {
            readAll(e);
            Offnoti(e);
          }}
        >
          모두 읽음
        </span>
      </div>
      {/*
      <div className={s.tab}>
        <div className={s.nav} onClick={(e) => FilterData(e, 'all')}>
          모든 알림 보기
        </div>
        <div className={s.nav} onClick={(e) => FilterData(e, 'read')}>
          읽은 알림 보기
        </div>
        <div className={s.nav} onClick={(e) => FilterData(e, 'unread')}>
          안읽은 알림 보기
        </div>
      </div>
     */}
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
              <Link to={item.url}>{item.message}</Link>
              <span className={s.ctl}>
                {item.readStatus !== "READ" && (
                  <span onClick={(e) => readId(e, item.id)} className={s.read_log}>
                    읽음 표시
                  </span>
                )}
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

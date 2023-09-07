import { ApigetAlarmUnRead, deleteAlarm, getAlarm, postAlarmAllRead, readAlarm } from "api/alarm";
import classnames from "classnames";
import { useEffect, useState } from "react";
import { useMutation, useQueries, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { OFF_NOTI, ON_NOTI } from "store/Notification";
import s from "./notification.module.scss";
import classNames from "classnames";

const Notification = ({ unRead, classname }) => {
  const auth = useSelector((state) => state.authToken);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState();
  const [nav, setNav] = useState("all");

  const queries = useQueries([
    {
      queryKey: ["alaram"],
      queryFn: () => getAlarm(),
      enabled: auth.accessToken !== null,
    },
    {
      queryKey: ["alaramUnRead"],
      queryFn: () => ApigetAlarmUnRead(),
      enabled: auth.accessToken !== null,
    },
  ]);
  const getAlarmAll = queries[0];
  const getAlarmUnRead = queries[1];

  // 알람 모두 읽기
  const { isLoading: isLoadingAllREad, mutate: allread } = useMutation(["readAll"], () => postAlarmAllRead(), {
    onSuccess: () => {
      queryClient.invalidateQueries(["alaram"]);
      queryClient.invalidateQueries(["alaramUnRead"]);
    },
  });
  const readAll = (e) => {
    e.stopPropagation();
    allread();
  };

  const Offnoti = (e) => {
    e.stopPropagation();
    dispatch(OFF_NOTI());
  };

  // 특정 알람 삭제
  const { isLoading: isLoadingIdDelete, mutate: idDelete } = useMutation(["deleteId"], (id) => deleteAlarm(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["alaram"]);
      queryClient.invalidateQueries(["alaramUnRead"]);
    },
  });
  const deleteId = (e, id) => {
    e.stopPropagation();
    idDelete(id);
  };

  // 특정 알람 읽음처리
  const { mutate: idRead } = useMutation(["readId"], (id) => readAlarm(id), {
    onSuccess: (res) => {
      // setUnread(getAlarmAll.data);
      queryClient.invalidateQueries(["alaram"]);
      queryClient.invalidateQueries(["alaramUnRead"]);
    },
  });
  const readId = (e, id) => {
    e.stopPropagation();
    idRead(id);
  };

  useEffect(() => {
    if (getAlarmUnRead && getAlarmUnRead.data === 0) {
      dispatch(OFF_NOTI());
    } else {
      dispatch(ON_NOTI());
    }
  }, [dispatch, getAlarmUnRead]);

  const renderData =
    getAlarmAll.isSuccess &&
    getAlarmAll.data.filter((item) => {
      if (filteredData === "read") {
        return item.readStatus === "READ";
      }
      if (filteredData === "unread") {
        return item.readStatus === "WAIT";
      }
      return getAlarmAll.data;
    });

  console.log(";d", renderData);

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
        <div className={s.tab}>
          <div
            className={classNames(s.nav, {
              [s.is_select]: nav === "all",
            })}
            onClick={(e) => {
              // FilterData(e, "all");
              e.stopPropagation();
              setFilteredData("all");
              setNav("all");
            }}
          >
            모든 알림 보기
          </div>
          <div
            className={classNames(s.nav, {
              [s.is_select]: nav === "read",
            })}
            onClick={(e) => {
              // FilterData(e, "read");
              e.stopPropagation();
              setFilteredData("read");
              setNav("read");
            }}
          >
            읽은 알림 보기
          </div>
          <div
            className={classNames(s.nav, {
              [s.is_select]: nav === "unread",
            })}
            onClick={(e) => {
              // FilterData(e, "unread");
              e.stopPropagation();
              setFilteredData("unread");
              setNav("unread");
            }}
          >
            안읽은 알림 보기
          </div>
        </div>
      </div>

      <ul>
        {getAlarmAll.isLoading && <li>로딩중입니다..</li>}
        {renderData.length > 0 ? (
          renderData.map((item, i) => (
            <li
              key={i}
              className={classnames("", {
                [s.is_read]: item.readStatus === "READ",
              })}
              onClick={(e) => readId(e, item.id)}
            >
              <Link to={item.url} className="noti_link">
                {item.message}
              </Link>
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

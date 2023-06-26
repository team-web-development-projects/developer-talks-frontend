import axios from "axios";
import { ROOT_API } from "constants/api";
import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import s from "./notification.module.scss";

const Notification = () => {
  const auth = useSelector((state) => state.authToken);

  async function fetchProjects() {
    const { data } = await axios.get(`${ROOT_API}/alarm/all`, {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": auth.accessToken,
      },
    });
    return data;
  }

  const { status, data, error, isFetching, isPreviousData, isLoading } = useQuery({
    queryKey: ["noti"],
    queryFn: () => fetchProjects(),
  });

  console.log("data", data);

  return (
    <div className={s.noti}>
      <ul>
        {data && data.map((item, i) => (
          <li>{item.url}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;

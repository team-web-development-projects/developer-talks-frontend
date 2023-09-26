import React from "react";
import { ROOT_API } from "constants/api";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import TableItem2 from "./TableItem2";

const Notice = () => {
  const auth = useSelector((state) => state.authToken);
  const naviate = useNavigate();
  async function getUserList() {
    const { data } = await axios.get(`${ROOT_API}/announcements/all`, {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": auth.accessToken,
      }
    });
    return data;
  }

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["userList"],
    queryFn: getUserList,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error...</div>;

  return (
    <section>
      <strong>공지글</strong>
      <ul>
        {data.totalElements ? data.content.map((board, index) => <TableItem2 key={index} data={board} />) : <li>등록된 유저가 없습니다.</li>}
      </ul>
    </section>
  );
};

export default Notice;

import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { ROOT_API } from "constants/api";
import {useNavigate} from 'react-router-dom';
import "./main.scss";

const Main = () => {
  const naviate = useNavigate();
  async function fetchProjects() {
    const { data } = await axios.get(`${ROOT_API}/post/best`);
    return data;
  }

  const { status, data, error, isFetching, isPreviousData, isLoading } =
    useQuery({
      queryKey: ["best"],
      queryFn: () => fetchProjects(),
    });


  return (
    <div className="main-page page">
      <section>
        <strong>추천수 베스트 5</strong>
        <ul>
          {data && data.map((item, index) => (
              <li key={index} onClick={() => naviate(`/board/${item.id}`)}>
                <div className="info">
                  <span>
                    {item.nickname} {item.createDate}
                  </span>
                  <span>
                    {item.recommendCount} {item.viewCount}
                  </span>
                </div>
                <p>{item.title}</p>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
};

export default Main;

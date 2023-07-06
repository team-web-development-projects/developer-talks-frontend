import React from "react";
import { ROOT_API } from "constants/api";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Best = () => {
  const naviate = useNavigate();
  async function fetchProjects() {
    const { data } = await axios.get(`${ROOT_API}/post/best`);
    return data;
  }

  const { status, data, error, isFetching, isPreviousData, isLoading } = useQuery({
    queryKey: ["best"],
    queryFn: () => fetchProjects(),
    staleTime: 1 * 60 * 1000,
    cacheTime: 5 * 60 * 1000
  });

  return (
      <section>
        <strong>추천수 베스트 5</strong>
        <ul>
          {data &&
            data.map((item, index) => (
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
  );
};

export default Best;

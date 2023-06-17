import React from "react";
import { ROOT_API } from "constants/api";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const News = () => {
  const naviate = useNavigate();
  async function fetchProjects() {
    const { data } = await axios.get(`${ROOT_API}/news`);
    return data;
  }

  const { status, data, error, isFetching, isPreviousData, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: () => fetchProjects(),
  });

  console.log("news data", data);
  return (
    <div>
      <section>
        <strong>IT 뉴스</strong>
        <ul>
          {data ? (
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
            ))
          ) : (
            <li className="not-list">최신 뉴스가 존재하지 않습니다.</li>
          )}
        </ul>
      </section>
    </div>
  );
};

export default News;

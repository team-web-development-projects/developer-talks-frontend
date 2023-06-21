import React, { useEffect } from "react";
import { ROOT_API } from "constants/api";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import s from "./news.module.scss";

const News = () => {
  const auth = useSelector((state) => state.authToken);

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
    <section className={s.news}>
      <strong>IT 뉴스</strong>
      <ul>
        {data ? (
          data.map((item, index) => (
            <li key={index}>
              <a href={item.url} target="_blank" rel="noreferrer">
                <div className={s.imgwrap}>
                  <img src={item.image} alt="" />
                </div>
                <div className={s.content_wrap}>
                  <p className={s.title}>{item.title}</p>
                  <div className={s.content}>{item.content}</div>
                </div>
                <span>{item.date}</span>
              </a>
            </li>
          ))
        ) : (
          <li className="not-list">최신 뉴스가 존재하지 않습니다.</li>
        )}
      </ul>
    </section>
  );
};

export default News;

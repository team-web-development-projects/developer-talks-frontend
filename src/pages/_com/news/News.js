import axios from "axios";
import { ROOT_API } from "constants/api";
import { useQuery } from "react-query";
import s from "./news.module.scss";
import apiInstance from "module/useInterceptor";
import { useEffect } from "react";

const News = () => {
  const fetchData = async () => {
    const response = await apiInstance.get("/news");
    return response;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: () => fetchData(),
    refetchInterval: 60 * 60 * 1000, // 1시간
    refetchIntervalInBackground: true,
    keepPreviousData: true,
    staleTime: 60 * 60 * 1000, // 테스트코드
    cacheTime: 60 * 60 * 1000, // 테스트코드
  });

  return (
    <section className={s.news}>
      <strong>IT 뉴스</strong>
      <ul>
        {isLoading && <li>로딩중입니다..</li>}
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

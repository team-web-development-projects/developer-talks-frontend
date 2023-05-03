import ButtonBlack from "components/buttonBlack/ButtonBlack";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import s from "./boardMain.module.scss";
import { useQuery } from "react-query";

const BoardMain = () => {
  const handleSearch = () => {
    console.log("search");
  };
  const {
    isLoading,
    error,
    data: boardList,
  } = useQuery(
    ["boardList"],
    async () => {
      return fetch("data/boardList.json").then((res) => res.json());
    },
    { staleTime: 1000 * 60 * 5 }
  );
  if (isLoading) return <p>Loading...</p>;
  if(error) return <p>{error}</p>;
  return (
    <>
      {/* TODO: 시연님이 만든 헤더 컴포넌트 사용하기*/}
      <div className={s.banner}>
        <p>⭐자유주제⭐</p>
        <p>여러 회원들과 자유롭게 대화하세요😀</p>
      </div>
      <div className={s.header}>
        <div className={s.top}>
          <ButtonBlack name="정렬기능" />
          <Link to="/board/create">
            <ButtonBlack name="✏️작성하기" />
          </Link>
        </div>
        <form className={s.search} onSubmit={handleSearch}>
          <BiSearch />
          <input type="text" placeholder="원하는 내용을 검색해보세요~!" />
        </form>
      </div>
      <ul>
        {boardList.map((board) => (
          <li key={board.id}>
            <p>{board.title}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BoardMain;

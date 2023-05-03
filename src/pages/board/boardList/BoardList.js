import ButtonBlack from "components/buttonBlack/ButtonBlack";
import Pagination from "components/pagination/Pagination";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import s from "./boardList.module.scss";

const BoardList = () => {
  const [posts, setPosts] = useState([
    {
      id: "1",
      title: "test1",
      content:
        "사랑의 앞이 튼튼하며, 거친 사막이다. 청춘의 보배를 기쁘며, 날카로우나 구하지 하여도 그러므로 뿐이다. 이상 무엇을 목숨을 그들에게 천하를 능히 위하여, 그들은 듣기만 부패뿐이다. 내는 오직 실로 두손을 봄바람이다. 어디 무엇이 소금이라 있으며, 예가 기관과 인류의 뿐이다. 풀이 청춘의 지혜는 창공에 인간은 때까지 봄바람이다. 인류의 피는 주며, 자신과 쓸쓸하랴? 돋고, 그들의 것은 위하여, 그와 위하여서. 수 웅대한 설레는 피가 청춘이 피고, 것이다. 이는 이상이 구하기 생생하며, 천하를 운다.",
      nickname: "Ann",
    },
    {
      id: "2",
      title: "test2",
      content: "bbbbbbbbbbbbbbb",
      nickname: "Tree",
    },
    {
      id: "3",
      title: "test3",
      content: "ccccccccccccccccccccc",
      nickname: "Lotto",
    },
    {
      id: "4",
      title: "test3",
      content: "ccccccccccccccccccccc",
      nickname: "Lotto",
    },
    {
      id: "5",
      title: "test3",
      content: "ccccccccccccccccccccc",
      nickname: "Lotto",
    },
    {
      id: "6",
      title: "test3",
      content: "ccccccccccccccccccccc",
      nickname: "Lotto",
    },
    {
      id: "7",
      title: "test3",
      content: "ccccccccccccccccccccc",
      nickname: "Lotto",
    },
    {
      id: "8",
      title: "test3",
      content: "ccccccccccccccccccccc",
      nickname: "Lotto",
    },
    {
      id: "9",
      title: "test3",
      content: "ccccccccccccccccccccc",
      nickname: "Lotto",
    },
    {
      id: "10",
      title: "test3",
      content: "ccccccccccccccccccccc",
      nickname: "Lotto",
    },
    {
      id: "11",
      title: "test3",
      content: "ccccccccccccccccccccc",
      nickname: "Lotto",
    },
    {
      id: "12",
      title: "test3",
      content: "ccccccccccccccccccccc",
      nickname: "Lotto",
    },
    {
      id: "13",
      title: "test3",
      content: "ccccccccccccccccccccc",
      nickname: "Lotto",
    },
    {
      id: "14",
      title: "test3",
      content: "ccccccccccccccccccccc",
      nickname: "Lotto",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const indexOfLast = currentPage * postPerPage;
  const indexOfFirst = indexOfLast - postPerPage;
  const currentPost = (post) => {
    let currentPost = 0;
    currentPost = post.slice(indexOfFirst, indexOfLast);
    return currentPost;
  };
  const handleSearch = () => {
    console.log("search");
  };

  // TODO: useQuery 사용해보려 했으나, 에러 발생
  // const {
  //   isLoading,
  //   error,
  //   data: boardList,
  // } = useQuery(
  //   ["boardList"],
  //   async () => {
  //     console.log('fetching...')
  //     return fetch("data/boardList.json")
  //       .then((res) => res.json())
  //   },
  //   { staleTime: 1000 * 60 * 5 }
  // );
  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;
  return (
    <>
      {/* TODO: 시연님이 만든 헤더 컴포넌트 사용하기*/}
      <div className={s.banner}>
        <p>⭐자유주제⭐</p>
        <p>여러 회원들과 자유롭게 대화하세요😀</p>
      </div>
      <div className={s.header}>
        <form className={s.search} onSubmit={handleSearch}>
          <BiSearch />
          <input type="text" placeholder="원하는 내용을 검색해보세요~!" />
        </form>
        <div className={s.bottom}>
          <ButtonBlack name="정렬기능" />
          <Link to="/board/create">
            <ButtonBlack name="✏️작성하기" />
          </Link>
        </div>
      </div>
      <ul>
        {currentPost(posts).map((board) => (
          // <Link to={`/board/${board.id}`}>
            <li key={board.id} className={s.boardContainer}>
              <p className={s.title}>{board.title}</p>
              <p className={s.content}>{board.content}</p>
              <p className={s.nickname}>{board.nickname}</p>
            </li>
          // </Link>
        ))}
      </ul>

      <div className={s.pageContainer}>
        <Pagination
          postPerPage={postPerPage}
          totalPost={posts.length}
          paginate={setCurrentPage}
        />
      </div>
    </>
  );
};

export default BoardList;
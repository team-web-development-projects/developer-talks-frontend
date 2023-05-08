import BoardItem from "components/boardItem/BoardItem";
import Button from "components/button/Button";
import Pagination from "components/pagination/Pagination";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import Select from "components/select/Select";
import axios from "axios";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import s from "./boardList.module.scss";
import { data } from "./dummydata";
import { useQuery } from "react-query";
import { ROOT_API } from "constants/api";
import { useSelector } from "react-redux";
import react, { useEffect } from "react";

const BoardList = ({ type }) => {
  const auth = useSelector((state) => state.authToken);
  console.log("auth:", auth);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("token") === null ? false : true;
  const options = [
    { id: 0, text: "최신순" },
    { id: 1, text: "조회순" },
  ];
  //TODO: 백엔드 통신: Get/post/all
  //로그인을 안한 유저도 게시글은 볼 수 있게 만들려면, 백엔드랑 통신할 때 헤더에 토큰값이 필요없겠죠..?
  //백엔드 담당분께 말씀드려야할 지,,!
  // const [posts, setPosts] = useState(data);
  //TODO: Page 컴포넌트로 분리하기
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10;
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
  const handleClick = () => {
    console.log("작성하기 클릭");
    isLogin ? navigate("/board/post") : setModal(true);
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

  // const { status, data, error, isFetching, refetch } = useQuery(
  //   "lists",
  //   async () => {
  //     const res = await axios.get(
  //       `${ROOT_API}/post/all`,
  //       {
  //         params: { page: 1, size: 10 },
  //         headers: {
  //           "X-AUTH-TOKEN":
  //             "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxQG5hdmVyLmNvbSIsInVzZXJpZCI6IjExMTExIiwibmlja25hbWUiOiIxMTExMSIsImlhdCI6MTY4MzQ0NDU3NywiZXhwIjoxNjgzNDU1Mzc3fQ.mwLbJMYeSvkkLuhMKvuvkZ-9jfXvHzy4RrA_xSCnvzg",
  //         },
  //       },
  //       { withCredentials: false }
  //     );
  //     return res.data;
  //   }
  // );
  // console.log("da", data);
  useEffect(() => {
    axios
      .get(
        `${ROOT_API}/questions/all`,
        {
          params: { page: 1, size: 10 },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        }
      )
      .then(function (response) {
        console.log("리스트 불러온 값:", response);
      })
      .catch(function (error) {
        console.log("리스트 불러오기 실패: ", error.response);
      });

    axios
      .get("https://httpbin.org/get", {
        params: { answer: 2 },
      })
      .then(function (response) {
        console.log("params 테스트 성공:", response);
      })
      .catch(function (error) {
        console.log("params 테스트 실패: ", error.response);
      });
  }, []);

  return (
    <>
      {modal && (
        <BasicModal setOnModal={() => setModal()}>
          로그인을 하면 게시글을 작성할 수 있어요.
          <br />
          <Link to="/login">[로그인 하러 가기]</Link>
          <br />
        </BasicModal>
      )}
      <div className={s.banner}>
        <p>{type === "board" ? "⭐자유주제⭐" : ""}</p>
        <p>{type === "board" ? "여러 회원들과 자유롭게 대화하세요😀" : ""}</p>
      </div>
      <div className={s.header}>
        <form className={s.search} onSubmit={handleSearch}>
          <BiSearch />
          <input type="text" placeholder="원하는 내용을 검색해보세요~!" />
        </form>
        <div className={s.bottom}>
          <Select init="최신순" options={options} />
          {/* <Link to="/board/post">
            <Button>✏️작성하기</Button>
          </Link> */}
          <Button onClick={handleClick}>✏️작성하기</Button>
        </div>
      </div>
      <ul>
        {data &&
          data.map((board) => (
            <BoardItem
              key={board.id}
              id={board.id}
              title={board.title}
              content={board.content}
              nickname={board.nickname}
              type={type}
            />
          ))}
      </ul>

      <div className={s.pageContainer}>
        <Pagination
          postPerPage={postPerPage}
          // totalPost={posts.length}
          paginate={setCurrentPage}
        />
      </div>
    </>
  );
};

export default BoardList;

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
// import { data } from "./dummydata";
import { useQuery } from "react-query";
import { ROOT_API } from "constants/api";
import { useSelector } from "react-redux";
import react, { useEffect } from "react";

const BoardList = ({ type }) => {
  const auth = useSelector((state) => state.authToken);
  console.log("auth:", auth);
  const [modal, setModal] = useState(false);
  const [viewType, setViewType] = useState("");
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("token") === null ? false : true;
  const options = [
    { id: 0, text: "최신순" },
    { id: 1, text: "조회순" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10;

  const handleSearch = () => {
    console.log("search");
  };
  const handleClick = () => {
    console.log("작성하기 클릭");
    isLogin ? navigate("/board/post") : setModal(true);
  };

  useEffect(() => {
    // setViewType(type === 'post' ? )
  }, [viewType]);

  async function fetchProjects(currentPage) {
    const { data } = await axios.get(`${ROOT_API}/${type}/all`, {
      params: { page: currentPage - 1, size: 10 },
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": auth.accessToken,
      },
    });
    return data;
  }

  const { status, data, error, isFetching, isPreviousData } = useQuery({
    queryKey: [type, currentPage],
    queryFn: () => fetchProjects(currentPage),
    keepPreviousData: true,
    staleTime: 5000,
  });
  console.log("da", data);

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
        {data ? (
          data.content.map((board) => (
            <BoardItem
              key={board.id}
              id={board.id}
              title={board.title}
              content={board.content}
              nickname={board.nickname}
              type={type}
            />
          ))
        ) : (
          <li>등록된 게시글이 없습니다.</li>
        )}
      </ul>

      <div className={s.pageContainer}>
        <Pagination
          postPerPage={postPerPage}
          totalPost={data && data.totalElements}
          paginate={setCurrentPage}
        />
      </div>
    </>
  );
};

export default BoardList;

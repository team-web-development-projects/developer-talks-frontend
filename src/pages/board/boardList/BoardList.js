import axios from "axios";
import BoardItem from "components/boardItem/BoardItem";
import Button from "components/button/Button";
import Pagination from "components/pagination/Pagination";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import Scrolltop from "components/scrolltop/Scrolltop";
import SearchInput from "components/searchInput/SearchInput";
import Select from "components/select/Select";
import { ROOT_API } from "constants/api";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import s from "./boardList.module.scss";

const BoardList = ({ type }) => {
  const auth = useSelector((state) => state.authToken);
  const pageRouter = useSelector((state) => state.pageRouter);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const options = [
    { id: 0, text: "최신순" },
    { id: 1, text: "조회순" },
  ];

  const [currentPage, setCurrentPage] = useState(
    pageRouter.state ? pageRouter.state : 1
  );
  const postPerPage = 10;

  console.log("dd", auth);

  const handleClick = () => {
    auth && auth.accessToken
      ? navigate(`/${type === "post" ? "board" : "qna"}/post`)
      : setModal(true);
  };

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

  const { status, data, error, isFetching, isPreviousData, isLoading } =
    useQuery({
      queryKey: [type, currentPage],
      queryFn: () => fetchProjects(currentPage),
      // suspense: true,
    });

  if (isLoading) return <div>Loading...</div>;

  console.log("data", data);

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
        <p>{type === "post" ? "⭐자유주제⭐" : "❓Q&A❓"}</p>
        <p>
          {type === "post"
            ? "여러 회원들과 자유롭게 대화하세요😀"
            : "궁금한 것이 있다면 무엇이든 질문해보아요😊"}
        </p>
      </div>
      <div className={s.header}>
        <SearchInput />
        <div className={s.bottom}>
          <Select init="최신순" options={["최신순", "조회순"]} />
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
              nickname={board.nickname}
              vCnt={board.viewCount}
              fCnt={board.favoriteCount}
              rCnt={board.recommendCount}
              type={type}
              currentPage={currentPage}
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
      <Scrolltop />
    </>
  );
};

export default BoardList;

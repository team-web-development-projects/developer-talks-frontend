import axios from "axios";
import BoardItem from "components/boardItem/BoardItem";
import Button from "components/button/Button";
import Pagination from "components/pagination/Pagination";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import Scrolltop from "components/scrolltop/Scrolltop";
import SearchInput from "components/searchInput/SearchInput";
import Select from "components/select/Select";
import { ROOT_API } from "constants/api";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import s from "./boardList.module.scss";
import { useRef } from "react";

const BoardList = ({ type }) => {
  const auth = useSelector((state) => state.authToken);
  const { keyword } = useParams();
  const refetchQuery = useRef();
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const handleClickPost = () => {
    auth && auth.accessToken
      ? navigate(`/${type === "post" ? "board" : "qna"}/post`)
      : setModal(true);
  };

  async function getBoardList() {
    if (keyword) {
      const { data } = await axios.get(`${ROOT_API}/${type}/search`, {
        params: { keyword: keyword, page: currentPage - 1, size: 10 },
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": auth.accessToken,
        },
      });
      return data;
    } else {
      const { data } = await axios.get(`${ROOT_API}/${type}/all`, {
        params: { page: currentPage - 1, size: 10 },
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": auth.accessToken,
        },
      });
      return data;
    }
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: [type, currentPage],
    queryFn: getBoardList,
  });
  refetchQuery.current = refetch;

  useEffect(() => {
    setCurrentPage(1);
    refetchQuery.current();
  }, [keyword, type]);


  if (isLoading) return <div>Loading...</div>;

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
        <SearchInput type={type} />
        <div className={s.bottom}>
          {/* TODO: 옛날순 정렬 */}
          <Select init="최신순" options={["최신순", "옛날순"]} />
          <Button onClick={handleClickPost}>✏️작성하기</Button>
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
          currentPage={data.pageable.pageNumber + 1}
          totalPage={data.totalPages}
          paginate={setCurrentPage}
        />
      </div>
      <Scrolltop />
    </>
  );
};

export default BoardList;

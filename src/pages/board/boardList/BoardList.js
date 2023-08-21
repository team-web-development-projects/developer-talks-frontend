import axios from "axios";
import BoardBanner from "components/boardBanner/BoardBanner";
import BoardItem from "components/boardItem/BoardItem";
import Button from "components/button/Button";
import Pagination from "components/pagination/Pagination";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import Scrolltop from "components/scrolltop/Scrolltop";
import SearchInput from "components/searchInput/SearchInput";
import Select from "components/select/Select";
import { ROOT_API } from "constants/api";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import s from "./boardList.module.scss";

const BoardList = ({ type }) => {
  const auth = useSelector((state) => state.authToken);
  const { keyword } = useParams();
  const refetchQuery = useRef();
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectText, setSelectText] = useState("");

  const handleClickPost = () => {
    auth && auth.accessToken ? navigate(`/${type === "post" ? "board" : "qna"}/post`) : setModal(true);
  };

  async function getBoardList() {
    if (keyword) {
      const { data } = await axios.get(`${ROOT_API}/${type}/search`, {
        params: { keyword: keyword, page: currentPage - 1, size: 10, sort: selectText },
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": auth.accessToken,
        },
      });
      return data;
    } else {
      const { data } = await axios.get(`${ROOT_API}/${type}/all`, {
        params: { page: currentPage - 1, size: 10, sort: selectText },
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
  }, [keyword, type, selectText]);

  if (isLoading) return <div>Loading...</div>;
  console.log('data', data);

  console.log('boarlist', type);

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
      <BoardBanner>
        <p>{type === "post" ? "자유주제" : "Q&A"}</p>
        <p>{type === "post" ? "여러 회원들과 자유롭게 대화하세요" : "궁금한 것이 있다면 무엇이든 질문해보세요"}</p>
      </BoardBanner>
      <div className={s.header}>
        <SearchInput type={type} />
        <div className={s.bottom}>
          <Select
            init="최신순"
            options={["최신순", "추천순", "댓글순", "스크랩순", "조회순"]}
            sendText={setSelectText}
          />
          <Button size="small" onClick={handleClickPost}>
            작성하기
          </Button>
        </div>
      </div>
      <ul>
        {data.totalElements ? (
          data.content.map((board, index) => (
            <BoardItem key={index} data={board} type={type} currentPage={currentPage} />
          ))
        ) : (
          <li className={s.notlist}>등록된 게시글이 없습니다.</li>
        )}
      </ul>

      <div className={s.pageContainer}>
        <Pagination currentPage={data.pageable.pageNumber + 1} totalPage={data.totalPages} paginate={setCurrentPage} />
      </div>
      <Scrolltop />
    </>
  );
};

export default BoardList;

import { getBoardList } from "api/board";
import BoardBanner from "components/boardBanner/BoardBanner";
import BoardItem from "components/boardItem/BoardItem";
import Button from "components/button/Button";
import Pagination from "components/pagination/Pagination";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import Scrolltop from "components/scrolltop/Scrolltop";
import SearchInput from "components/searchInput/SearchInput";
import Select from "components/select/Select";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import s from "./boardList.module.scss";

const BoardList = ({ type }) => {
  const { keyword } = useParams();
  const auth = useSelector((state) => state.authToken);
  const pageNumber = useSelector((state) => state.paginationStore);
  const navigate = useNavigate();
  const refetchQuery = useRef();
  const [modal, setModal] = useState(false);
  const [selectText, setSelectText] = useState("");

  const handleClickPost = () => {
    auth && auth.accessToken ? navigate(`/${type === "post" ? "board" : "qna"}/post`) : setModal(true);
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: [type, pageNumber["boardlist"].item],
    queryFn: () => getBoardList(pageNumber["boardlist"].item, selectText, type, keyword),
  });
  refetchQuery.current = refetch;

  useEffect(() => {
    refetchQuery.current();
  }, [keyword, type, selectText]);

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
          data.content.map((board, index) => <BoardItem key={index} data={board} type={type} />)
        ) : (
          <li className={s.notlist}>등록된 게시글이 없습니다.</li>
        )}
      </ul>

      <div className={s.pageContainer}>
        <Pagination totalPage={data.totalPages} name={type === "post" ? 'boardlist': 'qnalist'} />
      </div>
      <Scrolltop />
    </>
  );
};

export default BoardList;

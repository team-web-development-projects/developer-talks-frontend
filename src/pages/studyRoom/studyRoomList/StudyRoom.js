import axios from "axios";
import Button from "components/button/Button";
import CardItem from "components/cardItem/CardItem";
import Pagination from "components/pagination/Pagination";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import Scrolltop from "components/scrolltop/Scrolltop";
import Select from "components/select/Select";
import { ROOT_API } from "constants/api";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsFillPeopleFill, BsLock, BsUnlock } from "react-icons/bs";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import s from "./studyroom.module.scss";

const BoardList = ({ type }) => {
  const auth = useSelector((state) => state.authToken);
  const pageRouter = useSelector((state) => state.pageRouter);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(
    pageRouter.state ? pageRouter.state : 1
  );
  const postPerPage = 10;

  console.log("dd", auth);

  const handleSearch = () => {
    console.log("search");
  };

  const handleClick = () => {
    auth && auth.accessToken ? navigate(`/studyroom/post`) : setModal(true);
  };

  async function fetchProjects() {
    const { data } = await axios.get(`${ROOT_API}/study-rooms`, {
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
      queryFn: fetchProjects,
    });

  if (isLoading) return <div>Loading...</div>;

  console.log("data", data);

  return (
    <div className={s.studyroom}>
      {modal && (
        <BasicModal setOnModal={() => setModal()}>
          로그인을 하면 게시글을 작성할 수 있어요.
          <br />
          <Link to="/login">[로그인 하러 가기]</Link>
          <br />
        </BasicModal>
      )}
      <div className={s.banner}>
        <p>⭐스터디룸⭐</p>
        <p>공부방</p>
      </div>
      <div className={s.header}>
        <form className={s.search} onSubmit={handleSearch}>
          <BiSearch />
          <input type="text" placeholder="원하는 내용을 검색해보세요~!" />
        </form>
        <div className={s.bottom}>
          <Select init="최신순" options={["최신순", "조회순"]} />
          <Button onClick={handleClick}>✏️룸 만들기</Button>
        </div>
      </div>
      <ul className={s.list}>
        {data ? (
          data.content.map((item, index) => (
            <li key={index} className={s.card_list}>
              <Link to={`/studyroom/${item.id}`}>
                <div className={s.autojoin}>
                  {item.autoJoin ? (
                    <BsUnlock size={24} />
                  ) : (
                    <BsLock size={24} />
                  )}
                </div>
                <div className={s.title}>{item.title}</div>
                <div className={s.tag}>
                  <span>react</span>
                  <span>java</span>
                </div>
                <div className={s.info}>
                  <div className={s.maker}>
                    {item.studyRoomUsers[0].nickname}
                  </div>
                  <div className={s.icon}>
                    <BsFillPeopleFill size={16} />
                    <span>{item.studyRoomUsers.length}</span>
                  </div>
                </div>
              </Link>
            </li>
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
    </div>
  );
};

export default BoardList;

import axios from "axios";
import Button from "components/button/Button";
import Pagination from "components/pagination/Pagination";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import Scrolltop from "components/scrolltop/Scrolltop";
import Select from "components/select/Select";
import { ROOT_API } from "constants/api";
import { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsFillPeopleFill, BsLock, BsUnlock } from "react-icons/bs";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import s from "./studyroom.module.scss";
import { parseJwt } from "hooks/useParseJwt";
import classNames from "classnames";

const BoardList = ({ type }) => {
  const auth = useSelector((state) => state.authToken);
  const pageRouter = useSelector((state) => state.pageRouter);
  const [modal, setModal] = useState(false);
  const [secretModal, setecretModal] = useState(false);
  const navigate = useNavigate();
  const refetchQuery = useRef();

  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = () => {
    console.log("search");
  };

  const handleClick = () => {
    auth && auth.accessToken ? navigate(`/studyroom/post`) : setModal(true);
  };

  const joinRoomClick = (id) => {
    if (auth && auth.accessToken) {
      navigate(`/studyroom/info/${id}`);
    }
  };

  async function fetchProjects() {
    const { data } = await axios.get(`${ROOT_API}/study-rooms`, {
      params: { page: currentPage - 1, size: 12 },
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": auth.accessToken,
      },
    });
    return data;
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: [type, currentPage],
    queryFn: fetchProjects,
  });
  refetchQuery.current = refetch;

  useEffect(() => {
    setCurrentPage(1);
    refetchQuery.current();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  console.log("data", data);

  return (
    <>
      {auth.accessToken !== null ? (
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
          <ul
            className={classNames(s.list, {
              [s.is_not_list]: data && data.content.length === 0,
            })}
          >
            {data && data.content.length !== 0 ? (
              data.content.map((item, index) => (
                <li
                  key={index}
                  className={s.card_list}
                  onClick={() => joinRoomClick(item.id)}
                >
                  <div className={s.title}>{item.title}</div>
                  <div className={s.tag}>
                    {item.skills.map((items, indexs) => (
                      <span key={indexs}>{items}</span>
                    ))}
                  </div>
                  <div className={s.info}>
                    <div className={s.maker}>
                      {item.studyRoomUsers[0].nickname}
                    </div>
                    <div className={s.icon}>
                      <BsFillPeopleFill size={16} />
                      <span>{item.studyRoomUsers.filter((item) => item.status).length}</span>/
                      <span>{item.joinableCount}</span>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="tac">등록된 게시글이 없습니다.</li>
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
        </div>
      ) : (
        <div>로그인 후 이용하실 수 있습니다.</div>
      )}
    </>
  );
};

export default BoardList;

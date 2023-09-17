import { getStudyroomList } from "api/studyroom";
import classNames from "classnames";
import BoardBanner from "components/boardBanner/BoardBanner";
import Button from "components/button/Button";
import Pagination from "components/pagination/Pagination";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import Scrolltop from "components/scrolltop/Scrolltop";
import SearchInput from "components/searchInput/SearchInput";
import Select from "components/select/Select";
import { BsLock, BsUnlock } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import s from "./studyroom.module.scss";
import { getJoinedStudyroomList } from "api/auth";

const BoardList = ({ type }) => {
  const auth = useSelector((state) => state.authToken);
  const pageNumber = useSelector((state) => state.paginationStore);
  const { keyword } = useParams();
  const pageRouter = useSelector((state) => state.pageRouter);
  const [modal, setModal] = useState(false);
  const [secretModal, setecretModal] = useState(false);
  const navigate = useNavigate();
  const refetchQuery = useRef();
  const [selectText, setSelectText] = useState("id");

  const handleSearch = () => {
    console.log("search");
  };

  const handleClick = () => {
    auth && auth.accessToken ? navigate(`/studyroom/post`) : setModal(true);
  };

  const joinRoomClick = (id) => {
    const data = getJoinedStudyroomList();
    data.then((res) => {
      // 이미 방에 참여중이면 방정보 소개 페이지 패스
      const find = res.content.find((item) => item.id === id);
      console.log("re", res, find);
      if (find === undefined) {
        navigate(`/studyroom/info/${id}`);
      } else {
        navigate(`/studyroom/${id}`);
      }
    });
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: [type, pageNumber["studyroomlist"].item],
    queryFn: () => getStudyroomList(pageNumber["studyroomlist"].item, selectText),
  });
  refetchQuery.current = refetch;

  useEffect(() => {
    refetchQuery.current();
  }, [keyword]);

  if (isLoading) return <div>Loading...</div>;

  console.log("스터디룸 목록", data);

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
          <BoardBanner className={s.banner}>
            <p>스터디룸</p>
            <p>공부방</p>
          </BoardBanner>
          <div className={s.header}>
            <SearchInput type="studyroom" placeholder="스터디룸 이름 검색" />
            <div className={s.bottom}>
              <Select init="최신순" options={["최신순", "참여인원순"]} sendText={setSelectText} />
              <Button onClick={handleClick} size="small">
                룸 만들기
              </Button>
            </div>
          </div>
          <ul
            className={classNames(s.list, {
              [s.is_not_list]: data && data.content.length === 0,
            })}
          >
            {data && data.content.length !== 0 ? (
              data.content.reverse().map((item, index) => (
                <li key={index} className={s.card_list} onClick={() => joinRoomClick(item.id)}>
                  <div className={s.title}>{item.title}</div>
                  <span className={s.lock}>{item.autoJoin ? <BsUnlock size={18} /> : <BsLock size={18} />}</span>
                  <div className={s.tag}>
                    {item.skills.map((items, indexs) => (
                      <span key={indexs}>{items}</span>
                    ))}
                  </div>
                  <div className={s.info}>
                    <div className={s.maker}>{item.studyRoomUsers[0].nickname}</div>
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

          {data && (
            <div className={s.pageContainer}>
              <Pagination
                totalPage={data.totalPages}
                name='studyroomlist'
              />
            </div>
          )}
          <Scrolltop />
        </div>
      ) : (
        <div>로그인 후 이용하실 수 있습니다.</div>
      )}
    </>
  );
};

export default BoardList;

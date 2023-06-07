import axios from "axios";
import classNames from "classnames";
import DropDown from "components/dropdown/DropDown";
import { ROOT_API } from "constants/api";
import { useEffect, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MypageContent from "./MyPageContent";
import s from "./mystudyroom.module.scss";
import Pagination from "components/pagination/Pagination";
import StudyRoomPersonModal from "components/portalModal/studyRoomPersonModal/StudyRoomPersonModal";

const MyStudyRoom = () => {
  const [myList, setMyList] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [drop, setDrop] = useState({
    index: -1,
    state: false,
  });
  const auth = useSelector((state) => state.authToken);
  const [personModal, setPerseonModal] = useState(false);

  useEffect(() => {
    axios
      // 참여중인 스터디룸 리스트
      .get(`${ROOT_API}/study-rooms/user`, {
        params: { page: currentPage - 1, size: 6 },
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then(function (response) {
        console.log("가입중인 스터디 룸 정보 성공:", response.data.content);
        setMyList(response.data.content);
      })
      .catch(function (error) {
        console.log("스터디 룸 정보:실패 ", error.response);
      });
  }, []);

  async function fetchProjects() {
    const { data } = await axios.get(`${ROOT_API}/study-rooms/requests`, {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": auth.accessToken,
      },
    });
    return data;
  }

  const asignJoin = () => {
    console.log("가입승인");
  };

  const clickUser = (e, key) => {
    e.stopPropagation();
    if (key === drop.index) {
      setDrop({ ...drop, index: key, state: !drop.state });
    } else {
      setDrop({ ...drop, index: key, state: true });
    }
  };

  const asignUser = (studyRoomId, studyRoomUserId) => {
    console.log(`${studyRoomId}, ${studyRoomUserId}`);
    axios
      .post(
        `${ROOT_API}/study-room/accept/${studyRoomId}/${studyRoomUserId}`,
        {
          studyRoomId: studyRoomId,
          studyRoomUserId: studyRoomUserId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": auth.accessToken,
          },
        }
      )
      .then(function (response) {
        console.log("스터디 룸 승인완료:", response);
        alert("승인 되었습니다.");
      })
      .catch(function (error) {
        console.log("스터디 룸 정보:실패 ", error.response);
      });
  };

  const infoUser = () => {
    console.log("유저정보보기");
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["studyroom-request"],
    queryFn: fetchProjects,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  return (
    <MypageContent>
      {personModal && <StudyRoomPersonModal setOnModal={() => setPerseonModal()} />}
      <div className={classNames("content-wrap", [s.mystudyroom])}>
        <h3>스터디룸 신청 리스트</h3>
        <ul className={s.list}>
          {data && data.content.length !== 0 ? (
            data.content.map((item, index) => (
              <li onClick={asignJoin} key={index} className={s.list_item}>
                <div className={s.room_title}>{item.title}</div>
                <span className={s.user} onClick={(e) => clickUser(e, index)}>
                  {item.nickname}
                  {drop.index === index && drop.state && (
                    <DropDown>
                      <li onClick={() => asignUser(item.studyRoomId, item.studyRoomUserId)}>승인하기</li>
                      <li>유저정보보기</li>
                    </DropDown>
                  )}
                </span>
              </li>
            ))
          ) : (
            <>리스트가 없습니다.</>
          )}
        </ul>
        <h3>참여중 스터디룸</h3>
        <ul className={s.list}>
          {myList && myList.length !== 0 ? (
            myList.map((item, index) => (
              <li key={index} className={s.list_item} onClick={() => navigate(`/studyroom/${item.id}`)}>
                <div className={s.list_title}>{item.title}</div>
                <div className={s.count_wrap}>
                  <div
                    className={s.count}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPerseonModal(true);
                    }}
                  >
                    <BsFillPeopleFill size={16} />
                    <span>
                      {item.joinCount}/{item.joinableCount}
                    </span>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <>리스트가 없습니다.</>
          )}
        </ul>

        <div className={s.pageContainer}>
          <Pagination
            currentPage={data.pageable.pageNumber + 1}
            totalPage={data.totalPages}
            paginate={setCurrentPage}
          />
        </div>
      </div>
    </MypageContent>
  );
};

export default MyStudyRoom;

import { getInStudyRoomBoard } from "api/studyroom";
import classNames from "classnames";
import Button from "components/button/Button";
import InStudyRoomPostModal from "components/portalModal/inStudyroomPostModal/InStudyRoomPostModal";
import { useState } from "react";
import { useQuery } from "react-query";
import { boardDay } from "util/day";
import "./instudyroomboard.scss";

const InStudyRoomBoard = ({ postId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showmodal, setShowmodal] = useState(false);
  const [postType, setPostType] = useState("");
  const [boardId, setBoardId] = useState();

  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ["getInStudyRoomPost"],
    queryFn: () => getInStudyRoomBoard(currentPage, postId),
  });
  console.log("dta", postId, data);

  return (
    <div className="board-wrap">
      {showmodal && (
        <InStudyRoomPostModal setOnModal={() => setShowmodal()} postId={postId} type={postType} boardId={boardId} />
      )}
      <div>
        <Button
          size="small"
          onClick={() => {
            setShowmodal(true);
            setPostType("post");
          }}
        >
          작성
        </Button>
      </div>
      <div
        className={classNames("instudyroom-board", {
          // 'is-no-list': data.content.length <= 0
        })}
      >
        {isSuccess && data.content.length > 0 ? (
          data.content.map((item, i) => (
            <div
              key={i}
              className="item"
              onClick={() => {
                setShowmodal(true);
                setPostType("detail");
                setBoardId(item.id);
              }}
            >
              <div className="title_wrap">
                {item.category === "NOTICE" && <span className="category">공지</span>}
                <div className="title">{item.title}</div>
              </div>
              <div className="etc_wrap">
                {/* <div className="viewCount">{item.viewCount}</div> */}
                <div className="writer">{item.writer}</div>
                <div className="createDate">{boardDay(item.createDate)}</div>
              </div>
            </div>
          ))
        ) : (
          <>게시글이 없습니다.</>
        )}
      </div>
    </div>
  );
};

export default InStudyRoomBoard;

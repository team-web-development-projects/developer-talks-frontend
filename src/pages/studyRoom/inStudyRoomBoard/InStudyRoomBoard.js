import { ROOT_API } from "constants/api";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import Button from "components/button/Button";
import "./instudyroomboard.scss";
import InStudyRoomPostModal from "components/portalModal/inStudyroomPostModal/InStudyRoomPostModal";
import { boardDay } from "util/day";

const InStudyRoomBoard = ({ postId }) => {
  const auth = useSelector((state) => state.authToken);
  const [currentPage, setCurrentPage] = useState(1);
  const [showmodal, setShowmodal] = useState(false);
  const [postType, setPostType] = useState("");

  async function fetchProjects() {
    const { data } = await axios.get(`${ROOT_API}/study-rooms/posts/${postId}`, {
      params: { page: currentPage - 1, size: 10 },
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": auth.accessToken,
      },
    });
    return data;
  }

  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ["getInStudyRoomPost"],
    queryFn: fetchProjects,
  });
  console.log("dta", postId, data && data.content);

  return (
    <div className="board-wrap">
      {showmodal && <InStudyRoomPostModal setOnModal={() => setShowmodal()} postId={postId} type={postType} />}
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
      <div className="instudyroom-board">
        {isSuccess && data.content.length > 0 ? (
          data.content.map((item, i) => (
            <div
              key={i}
              className="item"
              onClick={() => {
                setShowmodal(true);
                setPostType("detail");
              }}
            >
              <div className="title_wrap">
                <div className="title">{item.title}</div>
                {/* <div className="category">{item.category}</div> */}
              </div>
              <div className="etc_wrap">
                <div className="viewCount">{item.viewCount}</div>
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

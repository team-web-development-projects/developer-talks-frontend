import { AiOutlineEye, AiOutlineStar, AiOutlineComment } from "react-icons/ai";
import { FiThumbsUp } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_ROUTER } from "store/PageRouter";
import s from "./boardItem.module.scss";
import ConsoleViewer from "components/consoleViewer/ConsoleViewer";
import Gravatar from "react-gravatar";
import { parseJwt } from "hooks/useParseJwt";
import ShowUserInfo from "components/showUserInfo/ShowUserInfo";
import { useState } from "react";
import MessageModal from "components/portalModal/messagemodal/MessageModal";
import { useOutOfClick } from "hooks/useOutOfClick";
import { useRef } from "react";
// import {useState}from ''

const BoardItem = ({ data, type, currentPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [showUserInfo, setShowUserInfo] = useState(false);
  const auth = useSelector((state) => state.authToken);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [meesageModal, setMeesageModal] = useState(false);
  const targetRef = useRef(null);

  const linkClick = (id, type) => {
    if (type === "post") {
      navigate(`/board/${id}`);
    } else {
      navigate(`/qna/${id}`);
    }
    dispatch(SET_ROUTER({ state: currentPage }));
  };

  useOutOfClick(targetRef, () => {
    setShowUserInfo(false);
  });

  return (
    <>
      {meesageModal && <MessageModal setOnModal={() => setMeesageModal()} recieverNick={data.userInfo.nickname} />}
      <li
        className={s.boardContainer}
        onClick={() => {
          linkClick(data.id, type);
        }}
      >
        {type !== "post" && (
          <div className={s.answerContainer}>
            <p>답변</p>
            <p>0</p>
          </div>
        )}
        <div className={s.frontContainer}>
          <div className={s.info_wrap}>
            {data.userInfo.userProfile !== null ? (
              <img className={s.userProfile} src={data.userInfo.userProfile} alt="프로필 이미지" />
            ) : (
              <Gravatar email={data.userInfo.nickname} className={s.userProfile} />
            )}
            {/*
            <span className="nickname">{data.userInfo.nickname}</span>
           */}
            {/*NOTE 닉네임 클릭 시 유저정보 */}
            <span
              className={s.nickname}
              onClick={(e) => {
                e.stopPropagation();
                setShowUserInfo(!showUserInfo);
              }}
            >
              {data.userInfo.nickname}
              {showUserInfo && (
                <div ref={targetRef}>
                  <ShowUserInfo
                    recieverNick={data.userInfo.nickname}
                    setShowUserInfo={setShowUserInfo}
                    setMeesageModal={setMeesageModal}
                  />
                </div>
              )}
            </span>
            <span className={s.item}>
              <AiOutlineEye color="#444" size={14} />
              <span>{data.viewCount}</span>
            </span>
            <span className={s.item}>{data.createDate}</span>
          </div>
          <p className={s.title}>{data.title}</p>
        </div>
        <div className={s.right}>
          <div className={s.bottomInfo}>
            <div className={s.countInfo}>
              <div className={s.item}>
                <AiOutlineStar color="#444" size={12} />
                <p>{data.favoriteCount}</p>
              </div>
              <div className={s.item}>
                <FiThumbsUp color="#444" size={12} />
                <p>{data.recommendCount}</p>
              </div>
              <div className={s.item}>
                <AiOutlineComment color="#444" size={14} />
                <p>{data.commentCount}</p>
              </div>
            </div>
          </div>
          {data.thumbnailUrl && (
            <div className={s.img}>
              <img src={data.thumbnailUrl} alt="썸네일 이미지" />
            </div>
          )}
        </div>
      </li>
    </>
  );
};

export default BoardItem;

import MessageModal from "components/portalModal/messagemodal/MessageModal";
import ShowUserInfo from "components/showUserInfo/ShowUserInfo";
import { useOutOfClick } from "hooks/useOutOfClick";
import { useRef, useState } from "react";
import Gravatar from "react-gravatar";
import { AiOutlineComment, AiOutlineEye, AiOutlineStar, AiFillCheckCircle } from "react-icons/ai";
import { FiThumbsUp } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import s from "./boardItem.module.scss";

const BoardItem = ({ data, type }) => {
  const navigate = useNavigate();
  const [meesageModal, setMeesageModal] = useState(false);

  const linkClick = (id, type) => {
    if (type === "post") {
      navigate(`/board/${id}`);
    } else {
      navigate(`/qna/${id}`);
    }
  };

  return (
    <>
      {meesageModal && <MessageModal setOnModal={() => setMeesageModal()} recieverNick={data.userInfo.nickname} />}
      <li
        className={s.boardContainer}
        onClick={() => {
          linkClick(data.id, type);
        }}
      >
        <div className={s.frontContainer}>
          {type !== "post" &&
            (data.selectAnswer ? (
              <div className={s.selectAnswerContainer}>
                <p>답변</p>
                <div>
                  {/* <AiFillCheckCircle /> */}
                  <p>{data.commentCount}</p>
                </div>
              </div>
            ) : (
              <div className={s.answerContainer}>
                <p>답변</p>
                <p>{data.commentCount}</p>
              </div>
            ))}
          <div className={s.boardInfo}>
            <div className={s.info_wrap}>
              {data.userInfo.userProfile !== null ? (
                <img className={s.userProfile} src={data.userInfo.userProfile} alt="프로필 이미지" />
              ) : (
                <Gravatar email={data.userInfo.nickname} className={s.userProfile} />
              )}
              <ShowUserInfo userinfo={data.userInfo} />
              {/* <span className="nickname">{data.userInfo.nickname}</span> */}
              <span className={s.item}>
                <AiOutlineEye color="#444" size={14} />
                <span>{data.viewCount}</span>
              </span>
              <span className={s.item}>{data.createDate}</span>
            </div>
            <p className={s.title}>{data.title}</p>
          </div>
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
              {type == "post" && (
                <div className={s.item}>
                  <AiOutlineComment color="#444" size={14} />
                  <p>{data.commentCount}</p>
                </div>
              )}
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

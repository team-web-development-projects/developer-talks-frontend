import { AiOutlineEye, AiOutlineStar, AiOutlineComment } from "react-icons/ai";
import { FiThumbsUp } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_ROUTER } from "store/PageRouter";
import s from "./boardItem.module.scss";
import ConsoleViewer from "components/consoleViewer/ConsoleViewer";

const BoardItem = ({ data, type, currentPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authToken);

  const linkClick = (id, type) => {
    if (type === "post") {
      navigate(`/board/${id}`);
    } else {
      navigate(`/qna/${id}`);
    }
    dispatch(SET_ROUTER({ state: currentPage }));
  };

  return (
    <>
      <li className={s.boardContainer} onClick={() => linkClick(data.id, type)}>
        <div className={s.info_wrap}>
          <span className="nickname">{data.userInfo.nickname}</span>
          <span className={s.item}>
            <AiOutlineEye color="#444" size={14} />
            <span>{data.viewCount}</span>
          </span>
          <span className={s.item}>
            {data.createDate}
          </span>
          <div className={s.icons}>
            <div className={s.item}>
              <AiOutlineStar color="#444" size={12} />
              <p>{data.favoriteCount}</p>
            </div>
            <div className={s.item}>
              <FiThumbsUp color="#444" size={12} />
              <p>{data.recommendCount}</p>
            </div>
          </div>
        </div>
        <div className={s.bottomInfo}>
          <p className={s.title}>{data.title}</p>
          <div className={s.countInfo}>
            <div className={s.item}>
              <AiOutlineComment color="#444" size={14} />
              <p>{data.commentCount}</p>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default BoardItem;

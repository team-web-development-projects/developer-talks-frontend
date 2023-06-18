import { AiOutlineEye, AiOutlineStar } from "react-icons/ai";
import { FiThumbsUp } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_ROUTER } from "store/PageRouter";
import s from "./boardItem.module.scss";

const BoardItem = ({
  id,
  title,
  nickname,
  vCnt,
  fCnt,
  rCnt,
  type,
  currentPage,
}) => {
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
      <li
        key={id}
        className={s.boardContainer}
        onClick={() => linkClick(id, type)}
      >
        <p className={s.title}>{title}</p>
        <div className={s.bottomInfo}>
          <p className={s.nickname}>{nickname}</p>
          <div className={s.countInfo}>
            <div className={s.item}>
              <AiOutlineEye color="#444" />
              <p>{vCnt}</p>
            </div>
            <div className={s.item}>
              <AiOutlineStar color="#444" />
              <p>{fCnt}</p>
            </div>
            <div className={s.item}>
              <FiThumbsUp color="#444" />
              <p>{rCnt}</p>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default BoardItem;

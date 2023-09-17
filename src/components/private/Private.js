import { getUserInfo, putPrivate } from "api/user";
import classNames from "classnames";
import { showToast } from "components/toast/showToast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DELETE_TOKEN } from "store/Auth";
import { removeCookie } from "util/authCookie";
import s from "./private.module.scss";

const Private = () => {
  const auth = useSelector((state) => state.authToken);
  const user = useSelector((state) => state.userStore);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.accessToken) {
      const res = getUserInfo(user.userid);
      res.then((response) => {
        setStatus(response);
        if (response === false) {
          // navigate("/");
          // localStorage.removeItem("dtrtk");
          // dispatch(DELETE_TOKEN());
        }
      });
    }
  }, []);

  const handleClick = () => {
    const newStatus = !status;
    setStatus(newStatus);
    !status && showToast("success", "비공개 설정 되었습니다");

    const res = putPrivate(newStatus);
    res
    // axios
    //   .put(`${ROOT_API}/users/setting/private/${newStatus}`, newStatus, {
    //     headers: { "X-AUTH-TOKEN": auth.accessToken },
    //   })
      .then((response) => {
        setStatus(!status);
        // NOTE: 토큰관리가 수정될때까지 변경시 로그아웃처리
        removeCookie('dtrtk', {path:'/'});
        dispatch(DELETE_TOKEN());
        if (status === false) {
          // navigate("/");
        }
      });
  };

  // ${status ? s.true : s.false}
  return (
    <button
      className={classNames(s.toggleSwitch, {
        [s.true]: status,
      })}
      onClick={handleClick}
    >
      <div className={s.toggleHandle} />
    </button>
  );
};

export default Private;

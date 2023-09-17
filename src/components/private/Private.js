import { getUserInfo, putPrivate } from "api/user";
import classNames from "classnames";
import { showToast } from "components/toast/showToast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DELETE_TOKEN } from "store/Auth";
import { removeCookie } from "util/authCookie";
import s from "./private.module.scss";
import { useQuery } from "react-query";

const Private = () => {
  const auth = useSelector((state) => state.authToken);
  const user = useSelector((state) => state.userStore);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (auth.accessToken) {
      const res = getUserInfo(user.userid);
      res.then((response) => {
        setStatus(response);
      });
    }
  }, []);

  const handleClick = () => {
    const newStatus = !status;
    setStatus(newStatus);
    !status && showToast("success", "비공개 설정 되었습니다");

    const res = putPrivate(newStatus);
    res.then((response) => {
      setStatus(!status);
    });
  };

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

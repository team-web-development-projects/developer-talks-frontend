import React from "react";
import axios from "axios";
import { useState } from "react";
import { ROOT_API } from "constants/api";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "components/toast/showToast";
import s from "./private.module.scss";
import { useEffect } from "react";
import { parseJwt } from "hooks/useParseJwt";
import { useNavigate, useParams } from "react-router-dom";
import { getUserInfo, putPrivate } from "api/user";
import classNames from "classnames";
import { DELETE_TOKEN } from "store/Auth";

const Private = () => {
  const auth = useSelector((state) => state.authToken);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.accessToken) {
      const res = getUserInfo(parseJwt(auth.accessToken).userid);
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
        console.log("ㅇㅇ", response, status);
        console.log('a', auth.accessToken)
        setStatus(!status);
        if (status === false) {
          // navigate("/");
          localStorage.removeItem("dtrtk");
          dispatch(DELETE_TOKEN());
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

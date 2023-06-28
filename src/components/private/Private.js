import React from "react";
import axios from "axios";
import { useState } from "react";
import { ROOT_API } from "constants/api";
import { useSelector } from "react-redux";
import { showToast } from "components/toast/showToast";
import s from "./private.module.scss";
import { useEffect } from "react";
import { parseJwt } from "hooks/useParseJwt";
import { useNavigate, useParams } from "react-router-dom";

const Private = () => {
  const auth = useSelector((state) => state.authToken);

  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(status,"111")
    axios
      .get(`${ROOT_API}/users/private/${parseJwt(auth.accessToken).userid}`, {
        headers: { "X-AUTH-TOKEN": auth.accessToken },
      })
      .then((response) => {
        setStatus(response.data);
      });
    console.log(status, "111ee");

  },[auth.accessToken, navigate]);

  const handleClick = () => {
    const newStatus = !status;
    setStatus(newStatus);
    !status && showToast("success", "😎 비공개 설정 되었습니다");
    axios
      .put(`${ROOT_API}/users/setting/private/${newStatus}`, newStatus, {
        headers: { "X-AUTH-TOKEN": auth.accessToken },
      })
      .then((response) => {
        console.log(response.config);
        setStatus(response.config.data);
      });
  };

  return (
    <button className={`${s.toggleSwitch} ${status ? s.true : s.false}`} onClick={handleClick}>
      <div className={s.toggleHandle} />
    </button>
  );
};

export default Private;

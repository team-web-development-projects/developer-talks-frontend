import React, { useEffect } from "react";
import Userside from "./_com/userside/Userside";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "util/authCookie";
import { toast } from "react-toastify";

const Index = () => {
  const auth = useSelector((state) => state.authToken);
  const navigate = useNavigate();
  const location = useLocation(); // 추가된 부분
  const active = location.state?.active; // 추가된 부분
  console.log("active: ", active);

  useEffect(() => {
    if (auth.accessToken === null && getCookie("dtrtk") === undefined) {
      navigate("/login", { replace: true });
    } else if (active === undefined) {
      toast.error("정지된 계정입니다. 홈 화면으로 이동합니다");
      navigate("/")
    }
  }, [auth.accessToken, navigate]);
  return <div>{auth.accessToken !== null && active !== undefined ? <Userside /> : null}</div>;
};

export default Index;

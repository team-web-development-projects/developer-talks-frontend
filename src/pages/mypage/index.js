import React, { useEffect } from "react";
import Userside from "./_com/userside/Userside";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCookie } from "util/authCookie";

const Index = () => {
  const auth = useSelector((state) => state.authToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.accessToken === null && getCookie("dtrtk") === undefined) {
      navigate("/login", { replace: true });
    }
  }, [auth.accessToken, navigate]);

  return <div>{auth.accessToken !== null ? <Userside /> : null}</div>;
};

export default Index;

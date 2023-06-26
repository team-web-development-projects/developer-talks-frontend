import React, { useEffect } from "react";
import Userside from "./_com/userside/Userside";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const auth = useSelector((state) => state.authToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.accessToken === null && localStorage.getItem("refreshToken") === null) {
      navigate("/login", { replace: true });
    }
  }, [auth.accessToken, navigate]);
  return <div>{auth.accessToken !== null ? <Userside /> : null}</div>;
};

export default Index;

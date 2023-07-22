import { parseJwt } from "hooks/useParseJwt";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { SET_TOKEN } from "store/Auth";

const useGoogleLoginAuth = () => {
  const auth = useSelector((state) => state.authToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 구글 로그인 토큰 인증
    if (window.location.href.includes("accessToken")) {
      // if (window.location.href.includes("accessToken") && window.location.href.includes("refreshToken")) {
      // const accessToken = window.location.href.split("accessToken=")[1].split("&refreshToken=")[0];
      // const refreshToken = window.location.href.split("accessToken=")[1].split("&refreshToken=")[1];
      const searchParams = new URLSearchParams(window.location.search);
      const accessToken = searchParams.get("accessToken");
      const refreshToken = searchParams.get("refreshToken");
      if (parseJwt(accessToken).nickname) {
        dispatch(SET_TOKEN({ accessToken: accessToken }));
        navigate("/", { replace: true });
      } else {
        localStorage.setItem("authAtk", accessToken);
        navigate("/userregist", { replace: true });
      }
      dispatch(SET_TOKEN({ accessToken: accessToken }));
      localStorage.setItem("dtrtk", refreshToken);
    }
  }, [dispatch, navigate, location, auth.accessToken]);
};

export default useGoogleLoginAuth;
import { parseJwt } from "hooks/useParseJwt";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { SET_TOKEN } from "store/Auth";
import { setCookie } from "util/authCookie";

const useGoogleLoginAuth = () => {
  const auth = useSelector((state) => state.authToken);
  const user = useSelector((state) => state.userStore);
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
      if (user.nickname) {
        dispatch(SET_TOKEN({ accessToken: accessToken }));
        navigate("/", { replace: true });
      } else {
        localStorage.setItem("authAtk", accessToken);
        navigate("/userregist", { replace: true });
      }
      dispatch(SET_TOKEN({ accessToken: accessToken }));
      setCookie("dtrtk", refreshToken, {
        path: "/",
        secure: "/",
      });
    }
  }, [dispatch, navigate, location, user.nickname]);
};

export default useGoogleLoginAuth;

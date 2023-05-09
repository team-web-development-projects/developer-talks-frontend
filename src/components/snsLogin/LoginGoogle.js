// import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
import "./snsbutton.scss";
import { Link } from "react-router-dom";

const LoginGoogle = () => {
  const open = () => {
    const popupY = window.screen.height / 2 - 600 / 2;
    const popupX = document.body.offsetWidth / 2 - 400 / 2;
    window.open(
      process.env.REACT_APP_GOOGLELOGIN_URL,
      "dd",
      "status=no, height=600, width=500, left=" + popupX + ", top=" + popupY
    );
  };

  const logOut = () => {
    googleLogout();
  };

  return (
    <>
      {/*
      <div onClick={() => open()}>Sign in with Google 🚀 </div>
     */}
      <Link to="https://dtalks-api.site/oauth2/authorization/google">
        구글 로그인
      </Link>
    </>
  );
};

export default LoginGoogle;

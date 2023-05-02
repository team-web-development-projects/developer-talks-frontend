// import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
import "./snsbutton.scss";

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
      <div onClick={() => open()}>Sign in with Google 🚀 </div>
    </>
  );
};

export default LoginGoogle;

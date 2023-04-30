// import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin, useGoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";
import { GOOGLE_ID } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import { useDispatch } from "react-redux";
import { SET_TOKEN } from "store/Auth";
import Logout from "./Logout";
import react, { useState, useEffect } from "react";
import "./snsbutton.scss";

const LoginGoogle = () => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const clientId = GOOGLE_ID;
  const GoogleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_ID}&response_type=token&redirect_uri=http://localhost:3000/redirect&scope=https://www.googleapis.com/auth/userinfo.email`;
  const dispatch = useDispatch();

  const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_ID}&redirect_uri=${GOOGLE_ID}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("토큰: ", tokenResponse);
      dispatch(SET_TOKEN({ accessToken: tokenResponse.access_token }));
    },
  });

  const login1 = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: "auth-code",
  });

  const login2 = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setUser(tokenResponse);
      console.log("tokenResponse: ", tokenResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const open = () => {
    window.open(GOOGLE_LOGIN_URL, "dd");
  }

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  // GoogleLogin 은 credential => 버튼 커스텀이 안됨.
  // useGoogleLogin 토큰, =>버튼 커스텀이 되나 토큰값이 이상함

  useEffect(() => {
    console.log("user:", user);
    console.log("user.access_token", user.access_token);

    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${user.access_token}`,
          // { withCredentials: false },
          {
            headers: {
              "Authorization": `Bearer ${user.access_token}`,
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
              "Access-Control-Allow-Credentials" : "*",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          console.log('res :', res);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <>
      {/*
      <a href="http://43.201.28.200:8080/oauth2/authorization/google">1버튼</a>
      <br />
      <Logout />
      <button onClick={() => login()}>버튼</button>
      <div className="your-custom-class">
        <GoogleLogin
          className="ttttttttttttttt"
          onSuccess={(res) => {
            console.log(res);
            const responsePayload = parseJwt(res.credential);

            console.log("credential : ", responsePayload);
            setUser(responsePayload);
          }}
          onFailure={(err) => {
            console.log(err);
          }}
        />
      </div>
      <button onClick={() => login()}>버튼</button>
    */}
      <button onClick={open}>새창열기</button>

      {/*
      <button onClick={logOut}>Log out</button>
    */}
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={() => login2()}>Sign in with Google 🚀 </button>
      )}
    </>
  );
};

export default LoginGoogle;

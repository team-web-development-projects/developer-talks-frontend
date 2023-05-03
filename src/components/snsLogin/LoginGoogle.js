import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
} from "@react-oauth/google";
import axios from "axios";
import { GOOGLE_ID } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";

const LoginGoogle = () => {
  const clientId = GOOGLE_ID;
  const GoogleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_ID}&response_type=token&redirect_uri=http://localhost:3000/redirect&scope=https://www.googleapis.com/auth/userinfo.email`;

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
    },
  });

  return (
    <>
      {/*
      <button onClick={() => login()}>버튼</button>
    */}

      <GoogleOAuthProvider clientId={clientId}></GoogleOAuthProvider>
      <GoogleLogin
        onSuccess={(res) => {
          console.log(res);
          const responsePayload = parseJwt(res.credential);

          console.log("dd : ", responsePayload);
        }}
        onFailure={(err) => {
          console.log(err);
        }}
      />
    </>
  );
};

export default LoginGoogle;

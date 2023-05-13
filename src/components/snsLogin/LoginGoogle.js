// import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { googleLogout } from '@react-oauth/google';
// import '../button/button.module.scss';
import BasicModal from 'components/portalModal/basicmodal/BasicModal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router/cjs/react-router.min';
import { SET_TOKEN } from 'store/Auth';
import { setRefreshToken } from '../../store/Cookie';

import './snsbutton.scss';
const LoginGoogle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const history = useHistory();
  const [modal, setModal] = useState(false);

  const open = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    window.location.href =
      'https://dtalks-api.site/oauth2/authorization/google';
    // const urls =
    //   "http://localhost:3000/?accessToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkamFnbWx3bm4xMkBnbWFpbC5jb20iLCJ1c2VyaWQiOiJkamFnbWx3bm4xMkBnbWFpbC5jb20iLCJuaWNrbmFtZSI6Iuq5gOyLnOyXsCIsImlhdCI6MTY4MzgxNjA3NywiZXhwIjoxNjgzODI2ODc3fQ.tPc7XoQ2qNmFHRB1dpSpuWLEEdPMLg1tdoi_Z2Jm7h0&refreshToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkamFnbWx3bm4xMkBnbWFpbC5jb20iLCJ1c2VyaWQiOiJkamFnbWx3bm4xMkBnbWFpbC5jb20iLCJuaWNrbmFtZSI6Iuq5gOyLnOyXsCIsImlhdCI6MTY4MzgxNjA3NywiZXhwIjoxNjgzOTAyNDc3fQ.OLMcOBACp4ldi4jxUEqM2p3rdZzn8aEoH7EF9SRZP_I";

    // // 문자열에서 accessToken과 refreshToken 추출
    // const accessToken = urls
    //   .split("accessToken=")[1]
    //   .split("&refreshToken=")[0];
    // const refreshToken = urls.split("&refreshToken=")[1];

    // const params = new URLSearchParams(window.location.search);
    // const accessToken = params
    //   .split('accessToken=')[1]
    //   .split('&refreshToken=')[0];
    // const refreshToken = params.split('&refreshToken=')[1];
    // console.log(accessToken);
    // console.log(refreshToken);
    // console.log('dd');

    setRefreshToken({
      refreshToken:
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkamFnbWx3bm4xMkBnbWFpbC5jb20iLCJ1c2VyaWQiOiJkamFnbWx3bm4xMkBnbWFpbC5jb20iLCJuaWNrbmFtZSI6Iuq5gOyLnOyXsCIsImlhdCI6MTY4Mzk0MTkzNywiZXhwIjoxNjg0MDI4MzM3fQ.yNm9xYGt5YqVOje4m4PMpLwrkm7TI1lMkdTMl5Po_HU',
    });
    dispatch(
      SET_TOKEN({
        accessToken:
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkamFnbWx3bm4xMkBnbWFpbC5jb20iLCJ1c2VyaWQiOiJkamFnbWx3bm4xMkBnbWFpbC5jb20iLCJuaWNrbmFtZSI6Iuq5gOyLnOyXsCIsImlhdCI6MTY4Mzk0MTkzNywiZXhwIjoxNjgzOTUyNzM3fQ.ef4JIaHkB16BUxx6VUBBk_JGZufGwyb1lG6MSRCJIoE',
      })
    );

    //NOTE - 로그인 성공
    console.log('구글로그인 성공:');
    history.push('/');
    return setModal(true);
  };

  const logOut = () => {
    googleLogout();
  };

  return (
    <>
      {modal && (
        <BasicModal setOnModal={() => setModal(false)}>
          로그인이 완료되었습니다. <br />
          확인을 누르시면 메인으로 이동합니다.
          <button onClick={() => navigate('/')}>확인</button>
        </BasicModal>
      )}
      <div className="google Button" onClick={() => open()}>
        {''}Google
      </div>
    </>
  );
};

export default LoginGoogle;

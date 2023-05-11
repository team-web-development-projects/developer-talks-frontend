// import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { googleLogout } from '@react-oauth/google';
// import '../button/button.module.scss';
import BasicModal from 'components/portalModal/basicmodal/BasicModal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router/cjs/react-router.min';
import { SET_TOKEN } from 'store/Auth';
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
    dispatch(
      SET_TOKEN({
        accessToken:
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkamFnbWx3bm4xMkBnbWFpbC5jb20iLCJ1c2VyaWQiOiJkamFnbWx3bm4xMkBnbWFpbC5jb20iLCJuaWNrbmFtZSI6Iuq5gOyLnOyXsCIsImlhdCI6MTY4MzcxMzU1MiwiZXhwIjoxNjgzNzI0MzUyfQ.WG8pFSP7dG49R3jakEIuWhxNbOtDfCwevz8mzgoSaYo&refreshToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkamFnbWx3bm4xMkBnbWFpbC5jb20iLCJ1c2VyaWQiOiJkamFnbWx3bm4xMkBnbWFpbC5jb20iLCJuaWNrbmFtZSI6Iuq5gOyLnOyXsCIsImlhdCI6MTY4MzcxMzU1MiwiZXhwIjoxNjgzNzk5OTUyfQ.NRgWfWGvRw1mX1wDhVXnoWyjYJExqhX5J_1G_zI4ZxQ',
      })
    );
    return setModal(true);
  };


  
  const onSuccess = () => {
    //NOTE - 로그인 성공
    console.log('구글로그인 성공:');
    history.push('/mypage');
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

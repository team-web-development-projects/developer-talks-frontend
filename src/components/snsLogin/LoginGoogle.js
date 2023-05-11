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
          '현재 url가져와서 자바스크립트로 끊어서 놓고 텍스트 잘라서 가져오기',
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

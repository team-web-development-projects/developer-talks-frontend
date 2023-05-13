import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
} from '@react-oauth/google';
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

  //TODO url추출 후 dispatch를 통해 유저 스토어에 저장
  const open = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    window.location.href =
      'https://dtalks-api.site/oauth2/authorization/google';

    const params =
      'http://localhost:3000/?accessToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJydWR3bm9rQGdtYWlsLmNvbSIsInVzZXJpZCI6InJ1ZHdub2tAZ21haWwuY29tIiwibmlja25hbWUiOiLqsr0iLCJpYXQiOjE2ODM5NzYzMjcsImV4cCI6MTY4Mzk4NzEyN30.EnqcRjKM1oLaACljmE2WZnv7HhK9MRnjEUW6rH-nglk&refreshToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJydWR3bm9rQGdtYWlsLmNvbSIsInVzZXJpZCI6InJ1ZHdub2tAZ21haWwuY29tIiwibmlja25hbWUiOiLqsr0iLCJpYXQiOjE2ODM5NzYzMjcsImV4cCI6MTY4NDA2MjcyN30.QRf8m9LwTS9gSTi1ibo3cfWfW4w3MGWlq_xv3ElbS_E';
    const accessToken = params
      .split('accessToken=')[1]
      .split('&refreshToken=')[0];
    console.log(accessToken);

    dispatch(
      SET_TOKEN({
        accessToken: accessToken,
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

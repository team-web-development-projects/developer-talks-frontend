// import { kakaoLogout } from '@react-oauth/naver';
import './snsbutton.scss';

const LoginKakao = () => {
  const open = () => {
    const popupY = window.screen.height / 2 - 600 / 2;
    const popupX = document.body.offsetWidth / 2 - 400 / 2;
    window.open(
      process.env.REACT_APP_GOOGLELOGIN_URL,
      'dd',
      'status=no, height=600, width=500, left=' + popupX + ', top=' + popupY
    );
  };

  // const logOut = () => {
  //   kakaoLogout();
  // };

  return (
    <>
      <div className="kakao Button" onClick={() => open()}>
        {''}kakao
      </div>
    </>
  );
};

export default LoginKakao;

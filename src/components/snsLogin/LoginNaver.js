// import { naverLogout } from '@react-oauth/naver';
import './snsbutton.scss';

const LoginNaver = () => {
  const open = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    window.location.href = `http://localhost:8080/oauth2/authorization/google`;
  };

  // const open = () => {
  //   const popupY = window.screen.height / 2 - 600 / 2;
  //   const popupX = document.body.offsetWidth / 2 - 400 / 2;
  //   window.open(
  //     process.env.REACT_APP_GOOGLELOGIN_URL,
  //     'dd',
  //     'status=no, height=600, width=500, left=' + popupX + ', top=' + popupY
  //   );
  // };
  // const logOut = () => {
  //   naverLogout();
  // };

  return (
    <>
      <div className="naver Button" onClick={() => open()}>
        {''}Naver
      </div>
    </>
  );
};

export default LoginNaver;

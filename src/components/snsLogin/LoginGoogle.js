// import '../button/button.module.scss';
import './snsbutton.scss';
import { Link } from 'react-router-dom';

const LoginGoogle = () => {
  const open = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    window.location.href =
      'https://dtalks-api.site/oauth2/authorization/google';
  };

  return (
    <>
      <div className="google Button" onClick={() => open()}>
        {''}Google
      </div>
    </>
  );
};

export default LoginGoogle;

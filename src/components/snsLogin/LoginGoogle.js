// import '../button/button.module.scss';
import './snsbutton.scss';

const LoginGoogle = () => {
  const open = async () => {
    await new Promise((r) => setTimeout(r, 1000));
  window.open("https://dtalks-api.site/oauth2/authorization/google", "_self");
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
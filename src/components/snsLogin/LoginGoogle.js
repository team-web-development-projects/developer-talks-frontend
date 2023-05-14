// import '../button/button.module.scss';
import "./snsbutton.scss";

const LoginGoogle = () => {

  //TODO url추출 후 dispatch를 통해 유저 스토어에 저장
  const open = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    window.location.href =
      "https://dtalks-api.site/oauth2/authorization/google";
  };

  return (
    <>
      <div className="google Button" onClick={() => open()}>
        {""}Google
      </div>
    </>
  );
};

export default LoginGoogle;

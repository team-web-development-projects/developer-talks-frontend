import s from "./snslogin.module.scss";

export const LoginGoogle = () => {
  const open = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    window.open("https://dtalks-api.site/oauth2/authorization/google", "_self");
  };
  return (
    <>
      <div className={`${s.google} ${s.Button}`} onClick={() => open()}>
        {""}Google
      </div>
    </>
  );
};

export const LoginKakao = () => {
  const open = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    window.location.href = `http://localhost:8080/oauth2/authorization/kakao`;
  };
  return (
    <>
      <div className={`${s.kakao} ${s.Button}`} onClick={() => open()}>
        {""}kakao
      </div>
    </>
  );
};

export const LoginNaver = () => {
  const open = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    window.location.href = `http://localhost:8080/oauth2/authorization/google`;
  };
  return (
    <>
      <div className={`${s.naver} ${s.Button}`} onClick={() => open()}>
        {""}Naver
      </div>
    </>
  );
};

export const Snslogin = ({ children }) => {
  return (
    // 스타일 적용 필요
    <div className={s.snswrap}>
      {children}
      {/*
    <LoginGoogle />
    <LoginNaver />
    <LoginKakao />
  */}
    </div>
  );
};

export default Snslogin;

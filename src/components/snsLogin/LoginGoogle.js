import { googleLogout } from "@react-oauth/google";
// import '../button/button.module.scss';
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import { useState } from "react";
import { SET_TOKEN } from "store/Auth";
import { useEffect } from "react";
import "./snsbutton.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRefreshToken } from "store/Cookie";

const LoginGoogle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const locate = useLocation();
  const [modal, setModal] = useState(false);

  const auth = useSelector((state) => state.authToken);

  //TODO url추출 후 dispatch를 통해 유저 스토어에 저장
  const open = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    window.location.href =
      "https://dtalks-api.site/oauth2/authorization/google";
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
          <button onClick={() => navigate("/")}>확인</button>
        </BasicModal>
      )}
      <div className="google Button" onClick={() => open()}>
        {""}Google
      </div>
    </>
  );
};

export default LoginGoogle;

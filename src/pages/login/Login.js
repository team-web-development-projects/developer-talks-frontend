import axios from "axios";
import Form from "components/form/Form";
import FormUserGuide from "components/form/FormUserGuide";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import LoginGoogle from "components/snsLogin/LoginGoogle";
import LoginKakao from "components/snsLogin/LoginKakao";
import LoginNaver from "components/snsLogin/LoginNaver";
import { ToastCont } from "components/toast/ToastCont";
import { showToast } from "components/toast/showToast";
import { API_HEADER, ROOT_API } from "constants/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_TOKEN } from "store/Auth";
import { setRefreshToken } from "store/Cookie";
import "./login.scss";

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [typetoggle, setTypetoggle] = useState('password')

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log('dd', data.userId, data.password);
    axios
      .post(
        `${ROOT_API}/sign-in`,
        {
          userid: data.userId,
          password: data.password,
        },
        {
          headers: {
            API_HEADER,
          },
        }
      )
      .then(function (response) {
        console.log("로그인 성공:", response);
        setRefreshToken({ refreshToken: response.data.refreshToken });
        dispatch(SET_TOKEN({ accessToken: response.data.accessToken }));
        setModal(true);
        reset();
      })
      .catch(function (error) {
       showToast("error", "😎 정보를 다시 입력해주세요");
        console.log('error', error);
      });
  };
  const typechange = () => { //NOTE 비밀번호 토글//ok
    setTypetoggle("text");

    setTimeout(() => {
      setTypetoggle("password");
    }, 1000);
  };
  const {
    register,
    // setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });

  return (
    <>
      {modal && (
        <BasicModal setOnModal={() => setModal(false)} dimClick={() => navigate("/")}>
          로그인이 완료되었습니다. <br />
          확인을 누르시면 메인으로 이동합니다.
          <button onClick={() => navigate("/")}>확인</button>
        </BasicModal>
      )}
      <ToastCont />
      <section className="login-page page">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>로그인페이지</legend>
            <p className="desc">
              Developer-Talks 가입으로
              <br />
              다양한 사람들을 만나보세요!
            </p>

            <ul className="login_main">
              <li>
                <label className="Id" htmlFor="userId">
                  아이디
                </label>
                <input
                  type="text"
                  id="userId"
                  placeholder="Developer-Talk Guest"
                  tabIndex="1"
                  maxLength="15"
                  aria-invalid={!isDirty ? undefined : errors.userId ? "true" : "false"}
                  {...register("userId", {
                    required: "아이디는 필수 입력입니다.",
                    minLength: {
                      value: 5,
                      message: "5자리 이상 15자리 이하로 입력해주세요.",
                    },
                  })}
                />
                {errors.userId && <small role="alert">{errors.userId.message}</small>}
              </li>
              <li>
                <label className="Pw" htmlFor="password">
                  비밀번호
                </label>
                <input
                  type={typetoggle}
                  id="password"
                  placeholder="********"
                  tabIndex="2"
                  maxLength="15"
                  aria-invalid={!isDirty ? undefined : errors.password ? "true" : "false"}
                  {...register("password", {
                    required: "비밀번호는 필수 입력입니다.",
                    minLength: {
                      value: 8,
                      message: "8자리 이상 15자리 이하로 비밀번호를 사용해주세요.",
                    },
                  })}
                />
                {errors.password && <small role="alert">{errors.password.message}</small>}
                <div className="typechange" type="typechange" onClick={typechange}>
                  👀
                </div>
              </li>
            </ul>
            <div className="button">
              <button type="submit" tabIndex="3" disabled={isSubmitting}>
                {" "}
                로그인
              </button>
            </div>
          </fieldset>
          <br />
          <div className="line-style">
            <div className="jb-division-line"></div>
            <span>SNS 로그인</span>
            <div className="jb-division-line"></div>
          </div>
          <div className="snsbuttonwrap">
            <LoginGoogle />
            <LoginNaver />
            <LoginKakao />
          </div>
        </Form>
        <FormUserGuide />
      </section>
    </>
  );
};

export default Login;
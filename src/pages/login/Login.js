import axios from "axios";
import Form from "components/form/Form";
import FormUserGuide from "components/form/FormUserGuide";
import { Label } from "components/label/Label";
import LineStyle from "components/lineStyle/LineStyle";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import Snslogin from "components/snsLogin/Snslogin";
import { Title } from "components/title/Title";
import { ToastCont } from "components/toast/ToastCont";
import { showToast } from "components/toast/showToast";
import { API_HEADER, ROOT_API } from "constants/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_TOKEN } from "store/Auth";
import { setRefreshToken } from "store/Cookie";
import s from "./login.module.scss";
import Button from "components/button/Button";
import Table from "components/table/Table";

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [typetoggle, setTypetoggle] = useState("password");

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
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
        // setRefreshToken({ refreshToken: response.data.refreshToken });
        localStorage.setItem("refreshToken", response.data.refreshToken);
        dispatch(SET_TOKEN({ accessToken: response.data.accessToken }));
        setModal(true);
        reset();
      })
      .catch(function (error) {
        showToast("error", "😎 정보를 다시 입력해주세요(회원정보가 없는 것일 수 있습니다.)");
      });
  };
  const typechange = () => {
    //NOTE 비밀번호 토글//ok
    setTypetoggle("text");

    setTimeout(() => {
      setTypetoggle("password");
    }, 1000);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });

  return (
    <>
      <ToastCont />
      {modal && (
        <BasicModal setOnModal={() => setModal(false)} dimClick={() => navigate("/")}>
          로그인이 완료되었습니다. <br />
          확인을 누르시면 메인으로 이동합니다.
          <button onClick={() => navigate("/")}>확인</button>
        </BasicModal>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>로그인페이지</legend>
          <Title />
          <Table tableTitle={"Developer-Talks"} tableText={"계정로그인"}>
            <li className={s.tableAlign}>
              <div className={s.errorcheck}>
                <Label children={"아이디"} htmlFor="userId" />
                <input
                  className={s.input}
                  type="text"
                  id="userId"
                  name="usderId"
                  placeholder="Developer-Talk Guest"
                  tabIndex="1"
                  maxLength="15"
                  autoComplete="useId"
                  aria-invalid={!isDirty ? undefined : errors.userId ? "true" : "false"}
                  {...register("userId", {
                    required: "아이디는 필수 입력입니다.",
                    minLength: {
                      value: 5,
                      message: "5자리 이상 15자리 이하로 입력해주세요.",
                    },
                  })}
                />
              </div>
              {errors.userId && (
                <small className="small" role="alert">
                  {errors.userId.message}
                </small>
              )}
            </li>
            <li className={s.tableAlign}>
              <div className={s.errorcheck}>
                <Label children={"비밀번호"} htmlFor="password" />
                <input
                  className={s.input}
                  type={typetoggle}
                  id="password"
                  placeholder="********"
                  tabIndex="2"
                  maxLength="15"
                  name="password"
                  autoComplete="current-password"
                  aria-invalid={!isDirty ? undefined : errors.password ? "true" : "false"}
                  {...register("password", {
                    required: "비밀번호는 필수 입력입니다.",
                    minLength: {
                      value: 8,
                      message: "8자리 이상 15자리 이하로 비밀번호를 사용해주세요.",
                    },
                  })}
                />
                <div className="typechange" type="typechange" onClick={typechange}>
                  👀
                </div>
              </div>
              {errors.password && (
                <small className="small" role="alert">
                  {errors.password.message}
                </small>
              )}
            </li>
          </Table>
          <Button FullWidth size="large" type="submit" tabIndex="3" disabled={isSubmitting}>
            {" "}
            로그인
          </Button>
        </fieldset>
        <br />
        <LineStyle gray text={"SNS 로그인"} />
        <Snslogin />
      </Form>
      <FormUserGuide />
    </>
  );
};

export default Login;

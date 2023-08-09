import axios from "axios";
import Button from "components/button/Button";
import Form from "components/form/Form";
import FormUserGuide from "components/form/FormUserGuide";
import Label from "components/label/Label";
import LineStyle from "components/lineStyle/LineStyle";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import { LoginGoogle, LoginKakao, LoginNaver, Snslogin } from "components/snsLogin/Snslogin";
import Table from "components/table/Table";
import { showToast } from "components/toast/showToast";
import { API_HEADER, ROOT_API } from "constants/api";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_TOKEN } from "store/Auth";
import s from "./login.module.scss";

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
        localStorage.setItem("dtrtk", response.data.refreshToken);
        dispatch(SET_TOKEN({ accessToken: response.data.accessToken }));
        // axios
        //   .get(`${ROOT_API}/notifications/subscribe`, {
        //     headers: {
        //       "Content-Type": "text/event-stream",
        //       Connection: "keep-alive",
        //       "Cache-Control": "no-cache",
        //     },
        //   })
        //   .then((res) => console.log("test: ", res));
        navigate("/");
        setModal(true);
        reset();
      })
      .catch(function (error) {
        showToast("error", error.response.data.message);
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>로그인페이지</legend>
          <p className={s.title}>
            Developer-Talks 가입으로
            <br /> 다양한 사람들을 만나보세요!
          </p>
          <Table tableTitle={"Developer-Talks"} tableText={"계정로그인"}>
            <div>
              <div>
                <Label htmlFor="userId">아이디</Label>
                <input
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
              {errors.userId && <small role="alert">{errors.userId.message}</small>}
            </div>
            <div>
              <div>
                <Label htmlFor="password">비밀번호</Label>
                <input
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
                <span className={s.typechange} type="typechange" onClick={typechange}>
                  👀
                </span>
              </div>
              {errors.password && <small role="alert">{errors.password.message}</small>}
            </div>
          </Table>
          <Button FullWidth size="large" type="submit" tabIndex="3" disabled={isSubmitting}>
            {" "}
            로그인
          </Button>
        </fieldset>
        <br />
        <LineStyle>SNS 로그인</LineStyle>
        <Snslogin>
          <LoginGoogle />
          <LoginNaver />
          <LoginKakao />
        </Snslogin>
      </Form>
      <FormUserGuide />
    </>
  );
};

export default Login;

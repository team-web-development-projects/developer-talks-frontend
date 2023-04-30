import Footer from "components/footer/Footer";
import Form from "components/form/Form";
import { useForm } from "react-hook-form";
import "./login.scss";
import { ROOT_API, API_HEADER, GOOGLE_ID } from "constants/api";
import { GoogleLogin, useGoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";
import LoginGoogle from "components/snsLogin/LoginGoogle";
import { Link } from "react-router-dom";

const Login = () => {
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
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
    console.log("data", data);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });

  const googleParams = {
    client_id:
      "501456863795-jsln82h66v9mrlljhtlme1s4aca31hf7.apps.googleusercontent.com",
    response_type: "code",
    redirect_uri: "http://localhost:3000/login",
    scope: "email profile",
  };
  const paramsG = new URLSearchParams(googleParams).toString();
  const logOut = () => {
    googleLogout();
  };

  return (
    <div>
      <section className="login-page page">
        {/*
        <Link to={`https://accounts.google.com/o/oauth2/v2/auth?${paramsG}`}>
          로그인
        </Link>
        <button onClick={logOut}>Log out</button>
      */}
        <LoginGoogle />
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
                  aria-invalid={
                    !isDirty ? undefined : errors.userId ? "true" : "false"
                  }
                  {...register("userId", {
                    required: "아이디는 필수 입력입니다.",
                    minLength: {
                      value: 5,
                      message: "5자리 이상 15자리 이하로 입력해주세요.",
                    },
                  })}
                />
                {errors.userId && (
                  <small role="alert">{errors.userId.message}</small>
                )}
              </li>
              <li>
                <label className="Pw" htmlFor="password">
                  비밀번호
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="********"
                  tabIndex="2"
                  maxLength="15"
                  aria-invalid={
                    !isDirty ? undefined : errors.password ? "true" : "false"
                  }
                  {...register("password", {
                    required: "비밀번호는 필수 입력입니다.",
                    minLength: {
                      value: 8,
                      message:
                        "8자리 이상 15자리 이하로 비밀번호를 사용해주세요.",
                    },
                  })}
                />
                {errors.password && (
                  <small role="alert">{errors.password.message}</small>
                )}
              </li>
            </ul>
            <div className="button">
              <button type="submit" tabIndex="3" disabled={isSubmitting}>
                {" "}
                로그인
              </button>
            </div>
          </fieldset>
        </Form>
      </section>
      <Footer />
    </div>
  );
};

export default Login;

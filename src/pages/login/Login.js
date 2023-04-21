import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const onSubmit = async (data) => {
    // axios
    //   .post(`https://url`, {
    //     modelName: data["modelName"],
    //     brand: data["brand"],
    //     price: data["price"],
    //     // size: data["size"],
    //   })
    //   .then(function (response) {
    //     // console.log("dta", response.data);
    //     alert("회원가입 완료");
    //   })
    //   .catch(function (error) {
    //     // 오류발생시 실행
    //   })
    //   .then(function () {
    //     // 항상 실행
    //   });
    console.log("data", data);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });

  return (
    <div>
      <section className="login">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>로그인페이지</legend>
            <p>
              Developer-Talks 가입으로
              <br />
              다양한 사람들을 만나보세요!
            </p>

            <ul className="login_main">
              <li>
                <label htmlFor="userId">아이디</label>
                <input
                  type="text"
                  id="userId"
                  placeholder="Guest"
                  tabindex="1"
                  aria-invalid={
                    !isDirty ? undefined : errors.userId ? "true" : "false"
                  }
                  {...register("userId", {
                    required: "아이디는 필수 입력입니다.",
                    minLength: {
                      value: 4,
                      message: "4글자 이상 입력해주세요.",
                    },
                  })}
                />
                {errors.userId && (
                  <small role="alert">{errors.userId.message}</small>
                )}
              </li>
              <li>
                <label for="userPw">비밀번호</label>
                <input
                  type="password"
                  id="userPw"
                  placeholder="******"
                  tabindex="2"
                  aria-invalid={
                    !isDirty ? undefined : errors.userPw ? "true" : "false"
                  }
                  {...register("userPw", {
                    required: "비밀번호는 필수 입력입니다.",
                    minLength: {
                      value: 8,
                      message: "8자리 이상 비밀번호를 사용해주세요.",
                    },
                  })}
                />
                {errors.userPw && (
                  <small role="alert">{errors.userPw.message}</small>
                )}
              </li>
            </ul>
            <div className="button">
              <button type="submit" tabindex="3" disabled={isSubmitting}>
                {" "}
                로그인
              </button>
            </div>
          </fieldset>
        </form>
      </section>
    </div>
  );
};

export default Login;

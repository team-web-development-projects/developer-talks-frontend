import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./Regist.scss";
import Footer from "../../components/footer/Footer";
import Form from "components/form/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import { useDispatch } from "react-redux";

axios.defaults.withCredentials = true;

const Regist = () => {
  const duplicatedId = ["dddd1", "dddd2"];
  let navigate = useNavigate();


  const [modal, setModal] = useState(false);

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    // NOTE: 이곳에서 통신
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });

  const validateId = (value) => {
    if (duplicatedId.includes(value)) {
      return "중복!!";
    }
  };

  return (
    <div className="regist-page page">
      {modal && (
        <BasicModal setOnModal={() => setModal()}>
          회원가입이 완료되었습니다. <br />
          확인을 누르시면 메인으로 이동합니다.
          <button onClick={() => navigate("/")}>확인</button>
        </BasicModal>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="form_1">
          <legend>정보입력</legend>
          <h2>Developer-Talks 계정 만들기</h2>
          <p className="chk">*필수사항 입니다.</p>
          <table>
            <thead />
            <tbody>
              <tr>
                <th>
                  <label htmlFor="userEmail">이메일</label>
                  <span className="star" title="필수사항">
                    *
                  </span>
                </th>
                <td>
                  <input
                    type="email"
                    id="userEmail"
                    placeholder="이메일을 입력해주세요"
                    tabIndex="1"
                    aria-invalid={
                      !isDirty ? undefined : errors.userEmail ? "true" : "false"
                    }
                    {...register("userEmail", {
                      required: "이메일은 필수 입력입니다.",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "이메일 형식에 맞지 않습니다.",
                      },
                    })}
                  />
                  {errors.userEmail && (
                    <small role="alert">{errors.userEmail.message}</small>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="userNickname">닉네임</label>
                  <span className="star" title="필수사항">
                    *
                  </span>
                </th>
                <td>
                  <input
                    type="text"
                    id="userNickname"
                    placeholder="닉네임을 입력해주세요"
                    tabIndex="2"
                    maxLength={15}
                    aria-invalid={
                      !isDirty
                        ? undefined
                        : errors.userNickname
                        ? "true"
                        : "false"
                    }
                    {...register("userNickname", {
                      required: "닉네임은 필수 입력입니다.",
                      minLength: {
                        value: 5,
                        message: "5자리 이상 입력해주세요.",
                      },
                      // pattern: {
                      //   value:
                      //     /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
                      //   message:
                      //     "닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!",
                      // },
                    })}
                  />
                  <button title="중복체크">중복체크</button>
                  {errors.userNickname && (
                    <small role="alert">{errors.userNickname.message}</small>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="userId">아이디</label>
                  <span className="star" title="필수사항">
                    *
                  </span>
                </th>
                <td>
                  <input
                    type="text"
                    id="userId"
                    placeholder="아이디를 입력해주세요"
                    maxLength={15}
                    tabIndex="3"
                    aria-invalid={
                      !isDirty ? undefined : errors.userId ? "true" : "false"
                    }
                    {...register("userId", {
                      required: "아이디는 필수 입력입니다.",
                      minLength: {
                        value: 5,
                        message: "5자리 이상 아이디를 사용해주세요.",
                      },
                      maxLength: {
                        value: 15,
                        message: "15자리 이하 아이디를 사용해주세요.",
                      },
                      validate: validateId,
                    })}
                  />
                  <button title="중복체크" onClick={validateId}>
                    중복체크
                  </button>
                  {errors.userId && (
                    <small role="alert">{errors.userId.message}</small>
                  )}
                </td>
              </tr>

              <tr>
                <th>
                  <label htmlFor="password">비밀번호</label>
                  <span className="star" title="필수사항">
                    *
                  </span>
                </th>
                <td>
                  <input
                    type="password"
                    id="password"
                    placeholder="최소 1개의 특수문자를 포함해주세요"
                    maxLength={15}
                    tabIndex="4"
                    aria-invalid={
                      !isDirty
                        ? undefined
                        : errors.password_1
                        ? "true"
                        : "false"
                    }
                    {...register("password", {
                      required: "비밀번호는 필수 입력입니다.",
                      minLength: {
                        value: 8,
                        message: "8자리 이상 비밀번호를 사용해주세요.",
                      },
                      maxLength: {
                        value: 15,
                        message: "15자리 이히 비밀번호를 사용해주세요.",
                      },
                      pattern: {
                        value: /.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*/,
                        message: "특수문자를 포함해주세요",
                      },
                    })}
                  />
                  {errors.password && (
                    <small role="alert">{errors.password.message}</small>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="passwordChk">비밀번호 확인</label>
                  <span className="star" title="필수사항">
                    *
                  </span>
                </th>
                <td>
                  <input
                    type="password"
                    id="passwordChk"
                    placeholder="비밀번호를 한 번 더 입력해주세요"
                    tabIndex="5"
                    maxLength={15}
                    aria-invalid={
                      !isDirty
                        ? undefined
                        : errors.password_2
                        ? "true"
                        : "false"
                    }
                    {...register("passwordChk", {
                      required: "비밀번호는 필수 입력입니다.",
                      minLength: {
                        value: 8,
                        message: "8자리 이상 비밀번호를 사용해주세요.",
                      },
                      maxLength: {
                        value: 15,
                        message: "15자리 이히 비밀번호를 사용해주세요.",
                      },
                      pattern: {
                        value: /.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*/,
                        message: "특수문자를 포함해주세요",
                      },
                      validate: (val) => {
                        if (watch("password") !== val) {
                          return "비밀번호가 일치하지 않습니다.";
                        }
                      },
                    })}
                  />
                  {errors.passwordChk && (
                    <small role="alert">{errors.passwordChk.message}</small>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
        <div className="submit">
          <button type="submit" tabIndex="7" disabled={isSubmitting}>
            {" "}
            가입하기
          </button>
        </div>
      </Form>
      <Footer />
    </div>
  );
};

export default Regist;

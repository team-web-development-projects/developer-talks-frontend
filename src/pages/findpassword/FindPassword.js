import axios from "axios";
import Button from "components/button/Button";
import Form from "components/form/Form";
import Label from "components/label/Label";
import Table from "components/table/Table";
import { showToast } from "components/toast/showToast";
import { ROOT_API } from "constants/api";
import React from "react";
import { useForm } from "react-hook-form";
import s from "./findpassword.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FindPassword = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [btnState, setBtnState] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const findUsercode = async (type) => {
    await new Promise((r) => setTimeout(r, 1000));
    if (type === "post") {
      axios
        .post(`${ROOT_API}/email/verify`, {
          email: watch().userEmail,
        })
        .then((response) => {
          showToast("success", "해당 이메일로 인증코드가 발송되었습니다.");
          setBtnState("send");
        })
        .catch((error) => {
          console.log(error);
          showToast("error", "정보를 다시 확인해주세요.");
        });
    } else if (type === "get") {
      axios
        .get(`${ROOT_API}/email/password/verify?code=${watch().inputEmail}`)
        .then((response) => {
          showToast("success", "확인되었습니다. 새 비밀번호를 입력하세요.");
          setToken(response.data.accessToken);
          setBtnState("passwordset");
        })
        .catch((error) => {
          showToast("error", "정보를 다시 확인해주세요.");
        });
    }
  };

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    axios
      .put(
        `${ROOT_API}/users/password`,
        {
          newPassword: watch().password,
          checkNewPassword: watch().passwordChk,
        },
        { headers: { "X-AUTH-TOKEN": token } }
      )
      .then((response) => {
        showToast("success", "비밀번호가 변경되었습니다.");
        navigate("/");
      })
      .catch((error) => {
        showToast("success", "잘못된 정보입니다.");
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>비밀번호 찾기</h2>
      <Table>
        <div>
          <div>
            <Label isRequire htmlFor="userEmail">
              이메일
            </Label>
            <input
              type="email"
              id="userEmail"
              placeholder="이메일을 입력해주세요"
              tabIndex="2"
              {...register("userEmail", {
                required: "이메일은 필수 입력입니다.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "이메일 형식에 맞지 않습니다.",
                },
              })}
            />
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                findUsercode("post");
              }}
              tabIndex="3"
            >
              이메일인증
            </Button>
          </div>
          {errors.userEmail && <small role="alert">{errors.userEmail.message}</small>}
        </div>
        {btnState === "send" && (
          <div>
            <div>
              <Label isRequire htmlFor="inputEmail">
                이메일 인증
              </Label>
              <input
                tabIndex="4"
                type="text"
                id="inputEmail"
                placeholder="인증번호를 입력해주세요"
                {...register("inputEmail", { required: true })}
              />
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  findUsercode("get");
                }}
                tabIndex="5"
              >
                확인
              </Button>
            </div>
          </div>
        )}
        {btnState === "passwordset" && (
          <div>
            <div>
              <Label isRequire htmlFor="password">
                새 비밀번호
              </Label>
              <input
                id="password"
                placeholder="최소 1개의 특수문자를 포함해주세요"
                maxLength={15}
                tabIndex="10"
                autoComplete="password"
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
            </div>
            {errors.password && <small role="alert">{errors.password.message}</small>}
          </div>
        )}
        <div>
          <div>
            <Label isRequire htmlFor="passwordChk">
              비밀번호 확인
            </Label>
            <input
              id="passwordChk"
              placeholder="비밀번호를 한 번 더 입력해주세요"
              tabIndex="11"
              maxLength={15}
              autoComplete="password"
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
          </div>
          {errors.passwordChk && <small role="alert">{errors.passwordChk.message}</small>}
        </div>
      </Table>
      <Button FullWidth size="large" type="submit" tabIndex="3" disabled={!isValid}>
        {" "}
        비밀번호 변경하기
      </Button>
    </Form>
  );
};

export default FindPassword;

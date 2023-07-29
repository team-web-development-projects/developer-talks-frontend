import Table from "components/table/Table";
import Form from "components/form/Form";
import Label from "components/label/Label";
import Button from "components/button/Button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Password = ({ auth, ROOT_API, axios, userData, disabled, showToast }) => {
  const [typetoggle, setTypetoggle] = useState("password");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" }); //NOTE 수정 전에도 disablw적용 필요
  const typechange = () => {
    //NOTE 비밀번호 토글//ok
    setTypetoggle("text");

    setTimeout(() => {
      setTypetoggle("password");
    }, 1000);
  };

  const onSubmitPassword = async () => {
    console.log(auth.accessToken);
    console.log(watch().newPassword);
    axios
      .put(
        `${ROOT_API}/users/profile/password`,
        {
          newPassword: watch().newPassword,
          checkNewPassword: watch().checkNewPassword,
          oldPassword: watch().oldPassword,
        },
        {
          headers: {
            "X-AUTH-TOKEN": auth.accessToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
        showToast("success", "😎 정보가 수정 되었습니다");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitPassword)}>
      <Table>
        <div>
          <div>
            <Label isRequire htmlFor="oldPassword">
              기존 비밀번호
            </Label>
            <input
              id="oldPassword"
              name="oldPassword"
              type={typetoggle}
              placeholder="*******"
              autoComplete="password"
              disabled={disabled}
              maxLength={15}
              {...register("oldPassword", {
                required: "공백일 수 없습니다.",
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
        </div>
        <div>
          <div>
            <Label isRequire htmlFor="newPassword">
              새로운비밀번호
            </Label>
            <input
              id="newPassword"
              name="newPassword"
              type={typetoggle}
              placeholder="최소 1개의 특수문자를 포함해주세요"
              autoComplete="password"
              disabled={disabled}
              maxLength={15}
              {...register("newPassword", {
                required: "공백일 수 없습니다.",
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
          {errors.newPassword && <small role="alert">{errors.newPassword.message}</small>}
        </div>
        <div>
          <div>
            <Label isRequire htmlFor="checkNewPassword">
              비밀번호 확인
            </Label>
            <input
              id="checkNewPassword"
              name="checkNewPassword"
              type={typetoggle}
              placeholder="*******"
              autoComplete="password"
              disabled={disabled}
              maxLength={15}
              {...register("checkNewPassword", {
                required: "공백일 수 없습니다.",
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
                  if (watch("newPassword") !== val) {
                    return "비밀번호가 일치하지 않습니다.";
                  }
                },
              })}
            />
            <span type="typechange" onClick={typechange}>
              👀
            </span>
          </div>
          {errors.checkNewPassword && <small role="alert">{errors.checkNewPassword.message}</small>}
        </div>
      </Table>
      <Button FullWidth size="large" type="submit" disabled={disabled}>
        저장
      </Button>
    </Form>
  );
};
export default Password;

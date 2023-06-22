import Table from "components/table/Table";
import Form from "components/form/Form";
import Label from "components/label/Label";
import Button from "components/button/Button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Password = ({ auth, ROOT_API, axios, userData, handleChange, disabled, showToast }) => {
  const [typetoggle, setTypetoggle] = useState("password");
  const [isFormValid, setIsFormValid] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" }); //NOTE 수정 전에도 disablw적용 필요
  useEffect(() => {
    setIsFormValid(Object.keys(errors).length === 0); // 입력값이 변경될 때마다 isFormValid 업데이트
  }, [errors]);
  const typechange = () => {
    //NOTE 비밀번호 토글//ok
    setTypetoggle("text");

    setTimeout(() => {
      setTypetoggle("password");
    }, 1000);
  };

  const onSubmitPassword = async () => {
    console.log(auth.accessToken);
    axios
      .put(
        `${ROOT_API}/users/profile/password`,
        {
          newPassword: userData.newPassword,
          checkNewPassword: userData.checkNewPassword,
          oldPassword: userData.oldPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
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
        {[
          <div>
            <Label isRequire htmlFor="newPassword">
              비밀번호
            </Label>
            <input
              id="newPassword"
              name="newPassword"
              type={typetoggle}
              placeholder="최소 1개의 특수문자를 포함해주세요"
              autoComplete="password"
              value={userData.newPassword}
              onChange={handleChange}
              disabled={disabled}
              maxLength={15}
              {...register("newPassword", {
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
            {errors.newPassword && <small role="alert">{errors.newPassword.message}</small>}
          </div>,
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
              value={userData.checkNewPassword}
              onChange={handleChange}
              disabled={disabled}
              maxLength={15}
              {...register("checkNewPassword", {
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
            {errors.checkNewPassword && <small role="alert">{errors.checkNewPassword.message}</small>}
          </div>,
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
              value={userData.oldPassword}
              onChange={handleChange}
              disabled={disabled}
              maxLength={15}
              {...register("oldPassword", {
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
          </div>,
        ]}
      </Table>
      <div type="typechange" onClick={typechange}>
        👀
      </div>
      <br />
      <Button FullWidth disabled={!isFormValid} size="large" type="submit">
        저장
      </Button>
    </Form>
  );
};
export default Password;

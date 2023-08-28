import axios from "axios";
import Button from "components/button/Button";
import Form from "components/form/Form";
import Label from "components/label/Label";
import Table from "components/table/Table";
import { showToast } from "components/toast/showToast";
import { ROOT_API } from "constants/api";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import s from "./finduser.module.scss";

const FindUser = () => {
  const auth = useSelector((state) => state.authToken);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const findUserId = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    axios
      .get(`${ROOT_API}/users/userid?email=${watch().userEmail}`, {
        headers: {
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then((response) => {
        showToast("success", "😎 해당 이메일로 귀하의 아이디가 발송되었었습니다.");
      })
      .catch((error) => {
        showToast("errors", "😎 정보를 다시 확인해주세요.");
      });
  };
  return (
    <Form onSubmit={handleSubmit(findUserId)}>
      <h2 className={s.title}>아이디 찾기</h2>
      <Table>
        <div>
          <div>
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
          </div>
        </div>
      </Table>
      {errors.userEmail && <small role="alert">{errors.userEmail.message}</small>}
      <Button FullWidth size="large" type="submit" tabIndex="3" disabled={!isValid}>
        {" "}
        찾기
      </Button>
    </Form>
  );
};

export default FindUser;

import Table from "components/table/Table";
import Form from "components/form/Form";
import Label from "components/label/Label";
import Button from "components/button/Button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { DELETE_TOKEN, SET_TOKEN } from "store/Auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROOT_API } from "constants/api";
import axios from "axios";
import { showToast } from "components/toast/showToast";

const Userid = ({ userData, handleChange }) => {
  const auth = useSelector((state) => state.authToken);
  const [duplicateId, setDuplicateId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmitUerid = async () => {
    axios
      .put(
        `${ROOT_API}/users/profile/userid`,
        {
          userid: watch().userid,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": auth.accessToken,
          },
        }
      )
      .then((response) => {
        showToast("success", "😎 정보가 수정 되었습니다");
        navigate("/");
        console.log("res", response);
        localStorage.removeItem("dtrtk");
        dispatch(DELETE_TOKEN());
        localStorage.setItem("dtrtk", response.data.refreshToken);
        dispatch(SET_TOKEN({ accessToken: response.data.accessToken }));
      })
      .catch((error) => console.log(error));
  };

  const validateDuplicate = (e) => {
    e.preventDefault();
    //NOTE 중복체크 통신//ok
    axios.get(`${ROOT_API}/users/check/userid/${watch().userid}`).then(function (response) {
      if (response.data.duplicated === true) {
        //NOTE 중복체크 수정
        setDuplicateId(true);
        showToast("error", "😎 아이디가 중복되었습니다.");
      } else {
        setDuplicateId(false);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitUerid)}>
      <Table>
        <div>
          <div>
            <Label isRequire htmlFor="userid">
              아이디
            </Label>
            <input
              id="userid"
              name="userid"
              onChange={handleChange}
              type="text"
              maxLength={15}
              defaultValue={userData?.userid || ""}
              {...register("userid", {
                minLength: {
                  value: 5,
                  message: "5자리 이상 아이디를 사용해주세요.",
                },
                maxLength: {
                  value: 15,
                  message: "15자리 이하 아이디를 사용해주세요.",
                },
              })}
            />
            <Button disabled={!watch().userid} onClick={validateDuplicate}>
              중복체크
            </Button>
          </div>
          {errors.userid && <small role="alert">{errors.userid.message}</small>}
          {duplicateId !== "" && duplicateId === true && <small className="alert">중복된 아이디입니다.</small>}
          {duplicateId !== "" && duplicateId === false && <small className="true">사용할 수 있는 아이디입니다.</small>}
        </div>
      </Table>
      <Button type="submit" disabled={!watch().userid} FullWidth size="large">
        저장
      </Button>
    </Form>
  );
};
export default Userid;

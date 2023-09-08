import axios from "axios";
import Button from "components/button/Button";
import Label from "components/label/Label";
import Table from "components/table/Table";
import { showToast } from "components/toast/showToast";
import { ROOT_API } from "constants/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DELETE_TOKEN, SET_TOKEN } from "store/Auth";
import { removeCookie, setCookie } from "util/authCookie";

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
        removeCookie("dtrtk", { path: "/" });
        dispatch(DELETE_TOKEN());
        setCookie("dtrtk", response.data.refreshToken, {
          path: "/",
          secure: "/",
        });
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
    <form onSubmit={handleSubmit(onSubmitUerid)}>
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
    </form>
  );
};
export default Userid;

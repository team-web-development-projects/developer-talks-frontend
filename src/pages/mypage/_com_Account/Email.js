import axios from "axios";
import Button from "components/button/Button";
import Label from "components/label/Label";
import Table from "components/table/Table";
import { showToast } from "components/toast/showToast";
import { ROOT_API } from "constants/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const Email = ({ userData, handleChange }) => {
  const auth = useSelector((state) => state.authToken);
  const [verityEmailcheck, setVerityEmailcheck] = useState(false);
  const [timer, setTimer] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    //이메일 수정
    if (verityEmailcheck) {
      axios
        .put(
          `${ROOT_API}/users/profile/email`,
          {
            email: userData.email,
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
    } else {
      showToast("errors", "😎 체크먼저 해주세요");
    }
  };
  const verityEmail = async (e) => {
    //NOTE 이메일 인증//ok
    e.preventDefault();
    axios
      .get(`${ROOT_API}/users/check/email/${userData.email}`) //NOTE 이메일 중복 확인//ok
      .then((response) => {
        if (response.data.duplicated === false) {
          axios
            .post(`${ROOT_API}/email/verify`, {
              email: userData.email,
            })
            .then((res) => {
              setVerityEmailcheck(true);
              showToast("success", "😎 인증문자가 발송되었습니다");
              console.log(res.data.timer, "fdfddfd");
              setTimer(res.data.timer);

              // Start the timer here
              startTimer();
            })
            .catch(() => {
              showToast("error", "😎 이메일을 제대로 입력해주세요");
            });
        } else {
          showToast("error", "😎 중복된 이메일입니다.");
        }
      });
  };

  const verityEmailchecking = async (e) => {
    //NOTE 이메일 인증//ok
    e.preventDefault();
    axios
      .get(`${ROOT_API}/email/verify?code=${userData.inputEmail}`)
      .then((res) => {
        console.log(res.data, "fdfddfd");
        showToast("success", "😎 인증되었습니다");
      })
      .catch(() => {
        showToast("error", "😎 인증을 제대로 입력해주세요");
      });
  };

  const startTimer = () => {
    const timer = setInterval(() => {
      setTimer((prevCount) => prevCount - 1);
    }, 1000);
    setTimer(timer); // Store the timer ID in state to access it in the cleanup function
  };
  useEffect(() => {
    return () => {
      clearInterval(timer); // Clear the interval timer when the component unmounts
    };
  }, [timer]);

  return (
    <form onSubmit={handleSubmit(onSubmitEmail)}>
      <Table>
        <div>
          <div>
            <Label isRequire htmlFor="userEmail">
              이메일
            </Label>
            <input
              id="userEmail"
              name="email"
              defaultValue={userData?.email || ""}
              onChange={handleChange}
              type="text"
              {...register("userEmail", {
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "이메일 형식에 맞지 않습니다.",
                },
              })}
            />
            <Button onClick={verityEmail}>이메일 인증</Button>
          </div>
          {errors.userEmail && <small role="alert">{errors.userEmail.message}</small>}
        </div>
        <div>
          <div>
            <Label isRequire htmlFor="userEmail">
              이메일 인증
            </Label>
            <input
              id="inputEmail"
              name="inputEmail"
              defaultValue={userData?.inputEmail || ""}
              onChange={handleChange}
              type="text"
            />
            <Button onClick={verityEmailchecking}>확인</Button>
          </div>
        </div>
      </Table>
      {timer}
      <Button type="submit" onClick={onSubmitEmail} FullWidth size="large">
        저장
      </Button>
    </form>
  );
};
export default Email;

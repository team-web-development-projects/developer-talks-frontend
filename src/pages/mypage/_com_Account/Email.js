import Table from "components/table/Table";
import Form from "components/form/Form";
import Label from "components/label/Label";
import Button from "components/button/Button";
import { useState } from "react";

const Email = ({ auth, ROOT_API, axios, userData, handleChange, disabled, showToast }) => {
  const [verityEmailcheck, setVerityEmailcheck] = useState(false);

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
          showToast("success", "😎 정보가 수정에 오류가 있습니다.");

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
              console.log(res.data, "fdfddfd");
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
  return (
    <Form onSubmit={onSubmitEmail}>
      <Table>
        {[
          <div>
            <Label isRequire htmlFor="userEmail">
              이메일
            </Label>
            <input id="userEmail" name="email" value={userData.email} disabled={disabled} onChange={handleChange} type="text" />
            <Button disabled={disabled} onClick={verityEmail}>
              이메일 인증
            </Button>
          </div>,
          <div>
            <Label isRequire htmlFor="userEmail">
              이메일 인증
            </Label>
            <input id="inputEmail" name="inputEmail" value={userData.inputEmail} disabled={disabled} onChange={handleChange} type="text" />
            <Button disabled={disabled} onClick={verityEmailchecking}>
              확인
            </Button>
          </div>,
        ]}
      </Table>
      <Button type="submit" disabled={disabled} onClick={onSubmitEmail} FullWidth size="large">
        저장
      </Button>
    </Form>
  );
};
export default Email;

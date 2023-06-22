import Table from "components/table/Table";
import Form from "components/form/Form";
import Label from "components/label/Label";
import Button from "components/button/Button";


const Email = ({ auth, ROOT_API, axios, userData, handleChange, disabled, showToast }) => {
  const onSubmitEmail = async (e) => {
    axios
      .put(
        `${ROOT_API}/users/profle/email`,
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
            <Button disabled={disabled}>이메일 인증</Button>
          </div>,
          <div>
            <Label isRequire htmlFor="userEmail">
              이메일 인증
            </Label>
            <input id="userEmail" name="email" value={userData.email} disabled={disabled} onChange={handleChange} type="text" />
            <Button disabled={disabled}>확인</Button>
          </div>,
        ]}
      </Table>
      <Button type="submit" disabled={disabled} FullWidth size="large">
        저장
      </Button>
    </Form>
  );
};
export default Email
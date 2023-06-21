import Table from "components/table/Table";
import Form from "components/form/Form";
import Label from "components/label/Label";
import Button from "components/button/Button";

const Password = ({ auth, ROOT_API, axios, userData, handleChange }) => {
  const onSubmitPassword = async (e) => {
    console.log(auth.accessToken);
    e.preventDefault();
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
      })
      .catch((error) => console.log(error));
  };

  return (
    <Form onSubmit={onSubmitPassword}>
      <Table>
        {[
          <div>
            <Label isRequire htmlFor="newPassword">
              비밀번호
            </Label>
            <input
              id="newPassword"
              name="newPassword"
              autoComplete="newPassword"
              value={userData.newPassword}
              onChange={handleChange}
              type="newPassword"
            />
          </div>,
          <div>
            <Label isRequire htmlFor="checkNewPassword">
              비밀번호 확인
            </Label>
            <input
              id="checkNewPassword"
              name="checkNewPassword"
              autoComplete="checkNewPassword"
              value={userData.checkNewPassword}
              onChange={handleChange}
              type="checkNewPassword"
            />

            {/* <div className={account.typechange} type="typechange" onClick={typechange}> */}
            {/* 👀 */}
            {/* </div> */}
          </div>,
          <div>
            <Label isRequire htmlFor="oldPassword">
              기존 비밀번호
            </Label>
            <input
              id="oldPassword"
              name="oldPassword"
              autoComplete="oldPassword"
              value={userData.oldPassword}
              onChange={handleChange}
              type="oldPassword"
            />
          </div>,
        ]}
      </Table>
      <br />
      <Button FullWidth size="large" type="submit">
        저장
      </Button>
    </Form>
  );
};
export default Password;

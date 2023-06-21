import Table from "components/table/Table";
import Form from "components/form/Form";
import Label from "components/label/Label";
import Button from "components/button/Button";


const Email = ({ auth, ROOT_API, axios,userData, handleChange }) => {
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
            <input id="userEmail" name="email" value={userData.email} onChange={handleChange} type="text" />
            <Button>이메일 인증</Button>
          </div>,
          <div>
            <Label isRequire htmlFor="userEmail">
              이메일 인증
            </Label>
            <input id="userEmail" name="email" value={userData.email} onChange={handleChange} type="text" />
            <Button>확인</Button>
          </div>,
        ]}
      </Table>
      <Button type="submit" FullWidth size="large">
        저장
      </Button>
    </Form>
  );
};
export default Email
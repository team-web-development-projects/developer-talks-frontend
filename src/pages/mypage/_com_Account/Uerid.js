import Table from "components/table/Table";
import Form from "components/form/Form";
import Label from "components/label/Label";
import Button from "components/button/Button";
const Userid = ({ auth, ROOT_API, axios,userData, handleChange }) => {
  const onSubmitUerid = async (e) => {
    axios
      .put(
        `${ROOT_API}/users/profile/userid`,
        {
          userid: userData.userid,
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
    <Form onSubmit={onSubmitUerid}>
      <Table>
        {[
          <div>
            <Label isRequire htmlFor="userid">
              아이디
            </Label>
            <input id="userid" name="userid" value={userData.userid} onChange={handleChange} type="text" />
            <Button
              onClick={(e) => {
                e.preventDefault();
                // validateDuplicate("userid");
              }}
            >
              중복체크
            </Button>
          </div>,
        ]}
      </Table>
      <Button type="submit" FullWidth size="large">
        저장
      </Button>
    </Form>
  );
};
export default Userid;

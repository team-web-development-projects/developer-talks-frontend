import Table from "components/table/Table";
import Form from "components/form/Form";
import Label from "components/label/Label";
import Button from "components/button/Button";

const Nickname = ({ auth, ROOT_API, axios, userData, handleChange, showToast }) => {
  const onSubmitNickname = async (e) => {
    e.preventDefault();
    axios
      .put(`${ROOT_API}/users/profile/nickname`, userData.nickname, {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then((response) => {
        console.log(response);
        showToast("success", "😎 정보가 수정 되었습니다");
      })
      .catch((error) => console.log(error));
  };
  return (
    <Form onSubmit={onSubmitNickname}>
      <Table tableTitle={"Developer-Talks 계정 만들기"} tableText={"*필수사항 입니다."}>
        {[
          <div>
            <Label isRequire htmlFor="nickname">
              닉네임
            </Label>
            <input id="nickname" name="nickname" value={userData.nickname} onChange={handleChange} type="text" />
            <Button
              onClick={(e) => {
                e.preventDefault();
                // validateDuplicate("nickname");
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
export default Nickname;

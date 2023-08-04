import Form from "components/form/Form";
import Button from "components/button/Button";
import Tags from "components/tags/Tags";
import { ROOT_API } from "constants/api";
import { showToast } from "components/toast/showToast";
import axios from "axios";
import { useSelector } from "react-redux";
import Table from "components/table/Table";
import Label from "components/label/Label";

const Description = ({ userData, handleChange, account, selectedTags, setSelectedTags }) => {
  const auth = useSelector((state) => state.authToken);
  const onSubmitDescription = async (e) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    axios
      .put(
        `${ROOT_API}/users/profile`,
        {
          description: userData.description,
          skills: selectedTags.tags,
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
    <Form onSubmit={onSubmitDescription}>
      <Table>
        <div>
          <div>
            <Label>한 줄 내소개</Label>
            <input
              type="description"
              id="description"
              name="description"
              defaultValue={userData.description || ""}
              placeholder="내 소개를 자유롭게 해보세요 80자까지 가능합니다."
              maxLength={80}
              onChange={handleChange}
            />
          </div>
        </div>
      </Table>
      <Button FullWidth size="large" type="submit">
        저장
      </Button>
      <br />
      <Tags selectedTags={selectedTags} setSelectedTags={setSelectedTags} text={"관심있는 태그설정"} />
    </Form>
  );
};
export default Description;

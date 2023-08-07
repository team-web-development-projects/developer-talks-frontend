import Button from "components/button/Button";
import Tags from "components/tags/Tags";

const Description = ({ auth, ROOT_API, axios, userData, handleChange, account, showToast, selectedTags, setSelectedTags }) => {

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
    <form onSubmit={onSubmitDescription}>
      <label>한 줄 내소개</label>
      <div className={account.description}>
        <input
          type="description"
          id="description"
          name="description"
          defaultValue={userData.description || ""}
          placeholder="내 소개를 자유롭게 해보세요 80자까지 가능합니다."
          maxLength={70}
          onChange={handleChange}
        />
      </div>
      <Tags selectedTags={selectedTags} setSelectedTags={setSelectedTags} text={"관심있는 테그입력"} />
      <Button FullWidth size="large" type="submit">
        저장
      </Button>
    </form>
  );
};
export default Description;

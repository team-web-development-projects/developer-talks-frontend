import Form from "components/form/Form";
import Button from "components/button/Button";
import { useState } from "react";
import Tags from "components/tags/Tags";

const Description = ({ auth, ROOT_API, axios, userData, handleChange, account, showToast, setImageFile, imageFile, selectedTags }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImageId, setProfileImageId] = useState("");

  const handleChangeProfileImage = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    const imageUrl = URL.createObjectURL(file);
    setImageFile(imageUrl);
    showToast("success", "😎 이미지가 업로드 되었습니다");
  };

  const onSubmitDescription = async (e) => {
    console.log(auth.accessToken);
    e.preventDefault();
    console.log(auth);
    await new Promise((r) => setTimeout(r, 1000));
    console.log(selectedImage, "dddddd");
    const formData = new FormData();
    formData.append("file", selectedImage);
    if (selectedImage) {
      axios
        .put(`${ROOT_API}/users/profile/image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-AUTH-TOKEN": auth.accessToken,
          },
        })
        .then((response) => {
          console.log(response);
          setProfileImageId(response.data.id);
          setImageFile(response.data.url);
        });
    }
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
      })
      .catch((error) => console.log(error));
  };
  return (
    <Form onSubmit={onSubmitDescription}>
      <div className={account.profile}>
        <div className={account.imgwrap}>
          {imageFile && <img src={imageFile} alt="프로필이미지" />}
          <input accept="image/*" type="file" name="프로필이미지" onChange={handleChangeProfileImage} id="profile" />
        </div>
      </div>
      <span>프로필 이미지 선택☝️</span>
      <br />
      <label>한 줄 내소개</label>
      <div className={account.description}>
        <input
          type="description"
          id="description"
          name="description"
          value={userData.description}
          placeholder="내 소개를 자유롭게 해보세요 80자까지 가능합니다."
          maxLength={80}
          onChange={handleChange}
        />
      </div>
      <Tags selectedTags={selectedTags} setSelectedTags={selectedTags} text={"관심있는 테그입력"} />
      <Button FullWidth size="large" type="submit">
        저장
      </Button>
    </Form>
  );
};
export default Description;

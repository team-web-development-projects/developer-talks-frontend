import Table from "components/table/Table";
import Form from "components/form/Form";
import Label from "components/label/Label";
import Button from "components/button/Button";
import { useState } from "react";
import { showToast } from "components/toast/showToast";
import { ROOT_API } from "constants/api";
import axios from "axios";
import { useSelector } from "react-redux";

const Nickname = ({ userData, handleChange }) => {
  const auth = useSelector((state) => state.authToken);
  const [duplicateNickName, setDuplicateNickName] = useState("");
  const onSubmitNickname = async (e) => {
    e.preventDefault();
    axios
      .put(
        `${ROOT_API}/users/profile/nickname`,
        {
          nickname: userData.nickname,
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
  const validateDuplicate = (data) => {
    axios
      .get(`${ROOT_API}/users/check/${data}/${userData.nickname}`)
      .then(function (response) {
        if (data === "nickname") {
          if (response.data.duplicated === true) {
            setDuplicateNickName(true);
            showToast("error", "😎 닉네임이 중복되었습니다.");
          } else {
            setDuplicateNickName(false);
            showToast("success", "😎사용가능한 닉네임입니다.");
          }
        }
      })
      .catch(() => {
        showToast("error", "😎 중복체크를 제대로 확인해주세요");
      });
  };
  return (
    <Form onSubmit={onSubmitNickname}>
      <Table>
        <div>
          <div>
            <Label isRequire htmlFor="nickname">
              닉네임
            </Label>
            <input id="nickname" name="nickname" defaultValue={userData?.nickname || ""} onChange={handleChange} type="text" />
            <Button
              onClick={(e) => {
                e.preventDefault();
                validateDuplicate("nickname");
              }}
            >
              중복체크
            </Button>
          </div>
        </div>
      </Table>
      <Button type="submit" FullWidth size="large">
        저장
      </Button>
    </Form>
  );
};
export default Nickname;

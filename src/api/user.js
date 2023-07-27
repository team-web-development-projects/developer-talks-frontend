import axios from "axios";
import { showToast } from "components/toast/showToast";
import { ROOT_API } from "constants/api";

export const deleteUser = async (password, auth) => {
  try {
    const response = await axios.delete(`${ROOT_API}/users`, {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": auth,
      },
      data: {
        password: password,
      },
    });
    console.log(response, "ddd");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getValidateDuplicate = async (type, value, setDuplicateId, setDuplicateNickName) => {
  if (value) {
    const response = await axios.get(`${ROOT_API}/users/check/${type}/${value}`);
    if (type === "nickname" && response.data.duplicated === true) {
      showToast("error", "😎 닉네임이 중복되었습니다.");
      setDuplicateNickName(true)
    } else if (type === "nickname" && response.data.duplicated === false) {
      showToast("error", "😎 사용가능.");
      setDuplicateNickName(false)
    } else if (type === "userid" && response.data.duplicated === true) {
      setDuplicateId(true)
      showToast("error", "😎 아이디가 중복되었습니다.");
    } else if (type === "userid" && response.data.duplicated === false) {
      showToast("error", "😎 사용가능.");
      setDuplicateId(false)
    }
  } else {
    showToast("error", "😎 입력을 해주세요");
  }
};

export const emailCheck = async (inputEmail) => {
  if (inputEmail) {
    try {
      const response = await axios.get(`${ROOT_API}/email/verify`, {
        params: { code: inputEmail },
      });
      showToast("success", "😎 인증이 확인되었습니다");

    } catch (error) {
      showToast("error", "인증을 정확히 확인해주세요");
    }
  } else {
    showToast("error", "인증을 정확히 확인해주세요");
  }
};


// export const emailCheck = async (inputEmail) => {
//   try {
//     await axios.get(`${ROOT_API}/email/verify`, {
//       params: { code: inputEmail },
//     });
//     showToast("error", "😎 중복된 이메일입니다.");
//   } catch (error) {
//     showToast("error", "😎 이메일을 제대로 입력해주세요");
//   }
// };
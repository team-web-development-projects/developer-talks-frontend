import axios from "axios";
import { ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";


// NOTE: 테스트중
const getProfileImg = async (auth) => {
  if (auth) {
    const response = await axios.get(`${ROOT_API}/users/profile/image`, {
      headers: { "X-AUTH-TOKEN": auth },
    });
    return response.data;
  }
};

const userActivity = {
  getProfileImg,
};

export default userActivity;

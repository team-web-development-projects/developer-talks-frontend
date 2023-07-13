import axios from "axios";
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

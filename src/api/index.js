import axios from "axios";
import { ROOT_API } from "constants/api";

const apiClient = axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: `${ROOT_API}`,
  // headers: {
  //   "Content-type": "application/json",
  // },
});

const getProfileImg = async (auth) => {
  console.log("받은 auth : ", auth);
  if (auth) {
    const response = await axios.get(`${ROOT_API}/users/profile/image`, {
      headers: { "X-AUTH-TOKEN": auth },
    });
    return response.data;
  }
};

const UpdateprofileImg = async ({ formData }) => {
  const response = await apiClient.put(`/todos/`, formData);
  return response.data;
};

const Service = {
  getProfileImg,
  UpdateprofileImg,
};

export default Service;

import axios from "axios";
import { ROOT_API } from "constants/api";

export const getPostUser = async () => {
  const response = await axios.get(`${ROOT_API}/post/all`);
  return response.data;
};

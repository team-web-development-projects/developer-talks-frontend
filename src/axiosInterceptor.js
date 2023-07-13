import axios from "axios";
import { ROOT_API } from "constants/api";

// url 호출 시 기본 값 셋팅
const api = axios.create({
  baseURL: `${ROOT_API}/token/refresh`,
  headers: { "Content-type": "application/json" }, // data type
});

api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("get response", response);
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    // Do something with response error
    console.log("response error", error);
    return Promise.reject(error);
  }
);

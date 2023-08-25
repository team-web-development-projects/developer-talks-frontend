// import { TokenRefresh } from "api/auth";
import axios from "axios";
import { showToast } from "components/toast/showToast";
import { ROOT_API } from "constants/api";
import { useDispatch, useSelector } from "react-redux";
import store from "store";
import { SET_TOKEN, refreshAccessToken, tokenSlice } from "store/Auth";
// import store
// import tokenSlice from ''

// const createAxiosInstance = () => {
const apiInstance = axios.create({
  baseURL: "https://dtalks-api.site",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

// 모든 요청하기전에?
apiInstance.interceptors.request.use(
  async (config) => {
    const accessToken = store.getState().authToken.accessToken;
    const refreshToken = localStorage.getItem("dtrtk");
    // console.log("인터셉터 토큰", accessToken);
    if (accessToken) {
      config.headers["X-AUTH-TOKEN"] = `${accessToken}`;
      return config;
    }
    if (!accessToken && refreshToken) {
      showToast("error", "회원 정보가 만료되었습니다.");
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 모든 요청이 완료된후
apiInstance.interceptors.response.use(
  (response) => {
    console.log("인터셉터 re", response.data);
    // if (response.status === 200) {
    //   console.log("Request succeeded!");
    // }
    // if (response.status !== 200) {
    //   console.log("dd");
    // }
    const res = response.data;
    return res;
  },
  async function (err) {
    if (err.response && err.response.status === 401) {
      // 토큰 재발급 요청
      const data = await axios.post(`${ROOT_API}/token/refresh`, {
        refreshToken: localStorage.getItem("dtrtk"),
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      });

      // console.log("data", data.data.accessToken);

      // store 갱신
      store.dispatch(
        SET_TOKEN({
          accessToken: `${data.data.accessToken}`,
        })
      );

      // 헤더에 담긴 토큰 값 변경
      err.config.headers = {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": `${data.data.accessToken}`,
      };

      // 재요청
      const originalResponse = await axios.request(err.config);
      console.log("dd", originalResponse);
      return originalResponse.data;
    }
    return Promise.reject(err);
  }
);

export default apiInstance;

// import { TokenRefresh } from "api/auth";
import axios from "axios";
import { showToast } from "components/toast/showToast";
import { ROOT_API } from "constants/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import store from "store";
import { SET_TOKEN, refreshAccessToken, tokenSlice } from "store/Auth";
import { SET_USER_INFO } from "store/User";
import { getCookie } from "util/authCookie";

const apiInstance = axios.create({
  baseURL: "https://dtalks-api.site",
  // headers: {
  //   "Content-Type": "application/json",
  // },
  timeout: 5000,
});
let lastErrorMessage = "";
// 요청하기전에?
apiInstance.interceptors.request.use(
  async (config) => {
    // console.log('요청', config);
    const accessToken = store.getState().authToken.accessToken;
    const refreshToken = getCookie("dtrtk");

    // 글작성시엔 content-type을 지워야 함
    if (config.url !== "/post") {
      config.headers["Content-Type"] = "application/json";
    }
    if (accessToken) {
      config.headers["X-AUTH-TOKEN"] = `${accessToken}`;
      return config;
    }
    // if (!accessToken && refreshToken) {
    //   showToast("error", "회원 정보가 만료되었습니다.");
    //   return config;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 요청이 완료된후
apiInstance.interceptors.response.use(
  (response) => {
    // console.log("인터셉터 re", response.data);
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
    // form data type인 글 작성일때
    if (err.response && err.response.data.message === "Content-Type 'application/json' is not supported") {
      const accessToken = store.getState().authToken.accessToken;
      delete apiInstance.defaults.headers["Content-Type"];
      err.config.headers = {
        "X-AUTH-TOKEN": `${accessToken}`,
      };

      // 재요청
      const originalResponse = await axios.request(err.config);
      return originalResponse.data;
    }
    // 유효하지 않은 토큰
    if (err.response && err.response.status === 400) {
      const navigate = useNavigate();
      navigate("/");
    }

    // 인증실패
    if (err.response && err.response.status === 401) {
      // 쿠키의 리프레쉬가 언디파인드가 아닐때만 토큰 재발급
      if (getCookie("dtrtk") !== "undefined") {
        const data = await axios.post(`${ROOT_API}/token/refresh`, {
          refreshToken: getCookie("dtrtk"),
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        });

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
        return originalResponse.data;
      }
      // 토큰 재발급 요청
      return Promise.reject(err);
    }

    if (err.response && err.response.status === 403) {
      // 403 에러 처리
      console.log("정지된 계정으로 이용하실 수 없습니다.");
      const errorMessage = "정지된 계정으로, 게시글 조회 외에는 이용하실 수 없습니다.";
      if (errorMessage !== lastErrorMessage) {
        toast.error(errorMessage);
        lastErrorMessage = errorMessage;
      }
    }
  }
);

export default apiInstance;

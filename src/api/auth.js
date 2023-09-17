const { default: apiInstance } = require("module/useInterceptor");

// 로그인
export async function login(data) {
  const res = await apiInstance.post(`/sign-in`, {
    userid: data.userId,
    password: data.password,
    fcmToken: localStorage.getItem("dtalksFcm"),
  });
  return res;
}

// 로그인 할때 내가 참여중인 스터디룸 가져오기
export async function getJoinedStudyroomList() {
  const res = await apiInstance.get(`/study-rooms/users`, {
    params: { page: 0, size: 999 },
  });
  return res;
}

// acees token을 이용해서 유저 정보 가져오기
export async function getUserInfoApi() {
  const res = await apiInstance.get(`/users/info`, {});
  return res;
}

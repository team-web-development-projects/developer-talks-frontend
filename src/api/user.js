const { default: apiInstance } = require("module/useInterceptor");

// *-----쪽지
// 쪽지 검색
export async function searchMessage(id) {
  const res = await apiInstance.get(`/messages/${id}`, {});
  return res;
}

// 쪽지 목록
export async function getMessage(type) {
  const res = await apiInstance.get(`/messages/${type}`, {});
  return res;
}

// 쪽지 삭제
export async function deleteMessage(type, id) {
  const res = await apiInstance.delete(`/messages/${type}/${id}`, {});
  return res;
}

// 쪽지 전송
export async function sendMessage(senderNickname, receiverNickname, text) {
  console.log("s", senderNickname, "re", receiverNickname, "te", text);
  const res = await apiInstance.post(`/messages`, {
    senderNickname: senderNickname,
    receiverNickname: receiverNickname,
    text: text,
  });
  return res;
}

// *---------유저정보
// 다른 유저 정보 보기
export async function getUserInfo(nickname) {
  const res = await apiInstance.get(`/users/private/${nickname}`, {});
  return res;
}

// 활동 내역 공개-비공개
export async function putPrivate(newStatus) {
  // console.log('cc', viewState);

  const res = await apiInstance.put(`/users/setting/private/${newStatus}`, newStatus, {});
  return res;
}

// *-----마이페이지
// 활동내역
export async function getUserActivity(currentPage, nickname) {
  const res = await apiInstance.get(`/users/recent/activity/${nickname}`, {
    params: { page: currentPage - 1, size: 10 },
  });
  return res;
}

// 글 작성 이력
export async function getUserPost(currentPage, nickname) {
  const res = await apiInstance.get(`/post/list/user/${nickname}`, {
    params: { page: currentPage - 1, size: 10 },
  });
  return res;
}

// 글 댓글 작성 이력
export async function getUserReply(currentPage, nickname) {
  const res = await apiInstance.get(`/comment/list/user/${nickname}`, {
    params: { page: currentPage - 1, size: 10 },
  });
  return res;
}

// 글 스크랩 이력
export async function getUserScrab(currentPage, nickname) {
  const res = await apiInstance.get(`/post/list/favorite/${nickname}`, {
    params: { page: currentPage - 1, size: 10 },
  });
  return res;
}

// 프로필 이미지
export async function getUserImage() {
  const res = await apiInstance.get(`/users/profile/image`, {});
  return res;
}

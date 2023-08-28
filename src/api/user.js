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
  console.log('s', senderNickname, 're', receiverNickname, 'te', text)
  const res = await apiInstance.post(`/messages`, {
    senderNickname: senderNickname,
    receiverNickname: receiverNickname,
    text: text,
  });
  return res;
}

// 다른 유저 정보 보기
export async function getUserInfo(nickname) {
  const res = await apiInstance.get(`/users/private/${nickname}`, {});
  return res;
}

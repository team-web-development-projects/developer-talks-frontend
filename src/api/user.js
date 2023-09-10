const { default: apiInstance } = require("module/useInterceptor");

// *-----쪽지
// 쪽지 검색
export async function searchMessage(id) {
  const res = await apiInstance.get(`/messages/byNickname/${id}`, {});
  return res;
}

// 쪽지 목록
export async function getMessage(type) {
  const res = await apiInstance.get(`/messages/${type}`, {});
  return res;
}

// 쪽지 삭제
export async function deleteMessage(type, id) {
  console.log("삭제", type, id);
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

// *---------스터디룸 관련
// 참여요청 스터디룸 리스트
export async function getRequestsRoomApi(currentMyListPage) {
  const res = await apiInstance.get(`/study-rooms/requests`, {
    params: { page: currentMyListPage - 1, size: 6 },
  });
  return res;
}

// 참여중인 스터디룸 리스트
export async function getJoinedUserApi(currentMyListPage) {
  const res = await apiInstance.get(`/study-rooms/users`, {
    params: { page: currentMyListPage - 1, size: 6 },
  });
  return res;
}

// 스터디룸 가입승인
export async function asignJoinUserApi(roomId, userId, sendStatus = true) {
  const res = await apiInstance.delete(`/study-rooms/accept/${roomId}/${userId}`, {
    params: { status: sendStatus },
  });
  return res;
}

// 스터디룸 내보내기
export async function deleteUser(roomId, nickname) {
  const res = await apiInstance.delete(`/study-rooms/expel/${roomId}/${nickname}`, {
    params: { studyRoomId: roomId, nickname: nickname },
  });
  return res;
}

// 스터디룸 나가기
export async function selfRoomOutApi(roomId) {
  const res = await apiInstance.delete(`/study-rooms/exit/${roomId}`, {});
  return res;
}

// 스터디룸 권한설정
export async function roomAuthApi(roomId, userId, value) {
  const res = await apiInstance.put(`/study-rooms/authority/${roomId}/${userId}`, null, {
    params: { studyRoomLevel: value },
  });
  return res;
}
const { default: apiInstance } = require("module/useInterceptor");
// 페이지네이션일 경우 content,아니면 단일 데이터

// 전체 스터디룸 목록
export async function getStudyroomList(currentPage, selectText) {
  const res = await apiInstance.get(`/study-rooms`, {
    params: { page: currentPage - 1, size: 12, sort: selectText },
  });
  return res;
}

// 스터디룸 가입요청
export async function joinStudyroom(postId) {
  const res = await apiInstance.post(`/study-rooms/join/${postId}`, {
    id: postId,
  });
  return res;
}

// 스터디룸 정보
export async function getStudyroomInfoList(postId) {
  const res = await apiInstance.get(`/study-rooms/${postId}`, {});
  return res;
}

// 스터디룸 내에 게시글 전체 보기
export async function getInStudyRoomBoard(currentPage, postId) {
  const res = await apiInstance.get(`/study-rooms/posts/${postId}`, {
    params: { page: currentPage - 1, size: 10 },
  });
  return res;
}

// 스터디룸 내에 게시글 작성
export async function postInStudyRoomBoard(postId, form) {
  const res = await apiInstance.post(`/study-rooms/posts/${postId}`, {
    title: form.title,
    content: form.content,
    category: "NORMAL",
  });
  return res;
}

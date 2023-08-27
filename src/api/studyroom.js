const { default: apiInstance } = require("module/useInterceptor");

// 전체 스터디룸 목록
export async function getStudyroomList({ currentPage, selectText }) {
  const res = await apiInstance.get(`/study-rooms`, {
    params: { page: currentPage - 1, size: 12, sort: selectText },
  });
  return { res, currentPage };
}

// 스터디룸 가입요청
export async function joinStudyroom(postId) {
  const res = await apiInstance.post(`/study-rooms/join/${postId}`, {
    id: postId,
  });
  return { res };
}

// 스터디룸 정보
export async function getStudyroomInfoList(postId) {
  const res = await apiInstance.get(`/study-rooms/${postId}`, {});
  return { res };
}

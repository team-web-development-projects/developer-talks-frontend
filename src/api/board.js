const { default: apiInstance } = require("module/useInterceptor");

// 전체 게시글 목록 - 검색
export async function getBoardList(currentPage, selectText, type, keyword) {
  if (keyword) {
    const res = await apiInstance.get(`${type}/search`, {
      params: { keyword: keyword, page: currentPage - 1, size: 10, sort: selectText },
    });
    return res;
  } else {
    const res = await apiInstance.get(`${type}/all`, {
      params: { page: currentPage - 1, size: 3, sort: selectText },
    });
    return res;
  }
}

// 게시글 작성
export async function postBoard(type, frm) {
  const res = await apiInstance.post(`/${type}`, frm);
  return res;
}

// 게시글의 추천수와 북마크수 상태 가져오기
export async function getReply(type, postId) {
  const res = await apiInstance.get(`/${type}/check/status/${postId}`, {});
  return res;
}

// *-------댓글
// 댓글 작성
export async function postReply(postId, id, newComment) {
  const res = await apiInstance.post(`/comment/${postId}/${id}`, newComment, {});
  return res;
}

// 댓글 수정
export async function putReply(id, updatedComment) {
  const res = await apiInstance.put(`/comment/${id}`, updatedComment, {});
  return res;
}

// 댓글 삭제
export async function deleteReply(id) {
  const res = await apiInstance.delete(`/comment/${id}`, {});
  return res;
}

// *------대댓글
// 대댓글 수정
export async function putRereply(id, updatedComment) {
  const res = await apiInstance.put(`/comment/${id}`, updatedComment, {});
  return res;
}

// 대댓글 삭제
export async function deleteRereply(id) {
  const res = await apiInstance.delete(`/comment/${id}`, {});
  return res;
}

// 대댓글 작성
export async function postRereply(postId, id, newComment) {
  const res = await apiInstance.post(`/comment/${postId}/${id}`, newComment, {});
  return res;
}

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
      params: { page: currentPage - 1, size: 10, sort: selectText },
    });
    return res;
  }
}
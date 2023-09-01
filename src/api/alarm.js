import apiInstance from "module/useInterceptor";

// 모든 알람
export async function getAlarm() {
  const res = await apiInstance.get(`/notifications/all`, {});
  return res;
}

// 읽지 않은 알람
export async function ApigetAlarmUnRead() {
  const res = await apiInstance.get(`/notifications/count`, {});
  return res;
}

// 알람 모두 읽기
export async function postAlarmAllRead(postId, form) {
  const res = await apiInstance.post(`/notifications/read/all`, {});
  return res;
}

// 특정 알람 삭제
export async function deleteAlarm(id) {
  const res = await apiInstance.delete(`/notifications/${id}`, {});
  return res;
}

// 특정 알람 읽음 처리
export async function readAlarm(id) {
  const res = await apiInstance.post(`/notifications/read/${id}`, {});
  return res;
}
import React from "react";
import dayjs from "dayjs";

// 앞에 두 년도 제거
export const day = (date) => {
  return dayjs(date).format("YY-MM-DD HH:mm:ss");
};

// n분전, n시간전, n일전, n달전, n년전
// export const calcDay = (data) => {
//
// return
// }

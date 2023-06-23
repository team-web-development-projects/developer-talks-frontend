import React from "react";

// 데이터 값 받으면 그 값을 D & D 가 가능한 창을 열어서 확인할수 있게 하기
const ConsoleViewer = ({ data }) => {
  console.log('dd', data);
  return (
    <div>
      콘솔 뷰어
      <div></div>
    </div>
  );
};

export default ConsoleViewer;

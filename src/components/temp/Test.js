import React from 'react'
import Gravatar from "react-gravatar";

const Test = () => {
  return (
    <div>
      테스트 컴포넌트
      <Gravatar email="rudwnok@gmail.com" rating="pg" />
      <Gravatar email="12@naver.com" />
      <Gravatar email="siyeon@naver.com" />
      <Gravatar email="blah@blah.com" />
    </div>
  );
}

export default Test
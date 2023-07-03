import React, { useEffect, useState } from "react";

const RednerTest = () => {
  const [test, setTest] = useState(false);
  useEffect(() => {
    console.log("컴포넌트가 화면에 나타남");
    setTest(true);
    return () => {
      if(test === false) {
        console.log("컴포넌트가 화면에서 사라짐");
      }
    };
  }, []);
  return <div>ddd</div>;
};

export default RednerTest;

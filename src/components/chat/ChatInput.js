import React, { useState, useEffect } from "react";

const ChatInput = ({ setText, onClick, text }) => {
  const [inputText, setInputText] = useState("");

  const click = (e) => {
    e.preventDefault();
    // const body = JSON.stringify("Hello");
    // stomp.send(
    //   `/pub/rooms/${postId}`,
    //   {
    //     "X-AUTH-TOKEN": auth.accessToken,
    //   },
    //   JSON.stringify(text)
    // );
    setText(inputText)
  };

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    
  }, [])

  console.log('input 컴포넌트 : ', text)

  return (
    <div>
      <form onSubmit={(e) => onClick(e, inputText)}>
        <input type="text" name="" id="" onChange={onChange}  value={inputText}/>
        <button>전송</button>
      </form>
    </div>
  );
};

export default ChatInput;

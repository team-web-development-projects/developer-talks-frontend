import React, { useState } from "react";

const ChatInput = ({ setText }) => {
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

  return (
    <div>
      <form onSubmit={click}>
        <input type="text" name="" id="" onChange={onChange}  value={inputText}/>
        <button>전송</button>
      </form>
    </div>
  );
};

export default ChatInput;

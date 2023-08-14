import React, { useState, useEffect } from "react";

const ChatInput = ({ setText, onClick }) => {
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
    setText(inputText);
    setInputText("");
  };

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          click(e, inputText);
          onClick(e, inputText);
        }}
      >
        <textarea type="text" name="" id="" onChange={onChange} value={inputText} />
        <button>전송</button>
      </form>
    </div>
  );
};

export default ChatInput;

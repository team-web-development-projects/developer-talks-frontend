import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { dayChat } from "util/day";
import "./chat.scss";

const ChatList = ({ postId, upText }) => {
  const scroll = useRef();
  const auth = useSelector((state) => state.authToken);
  const nickname = auth && parseJwt(auth.accessToken).nickname;
  const [dataPage, setDataPage] = useState(0);
  const [dataSize, setDataSize] = useState(20);
  const [atBottom, setAtBottom] = useState(false);

  async function getChatList() {
    const { data } = await axios.get(`${ROOT_API}/${postId}/chats`, {
      params: { page: dataPage, size: dataSize },
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": auth.accessToken,
      },
    });
    return data;
  }

  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ["chatList", dataPage, dataSize],
    queryFn: getChatList,
    enabled: atBottom,
  });

  // console.log("data:", data && data);
  const reversedList = data && [...data.content].reverse();
  // console.log("c", reversedList);
  const message = useSelector((state) => state.chatStore);
  // console.log("upText", message.data);

  const lineConverter = (text) => {
    return (
      <>
        {text.split("\\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </>
    );
  };

  const scrollToBottom = () => {
    if (scroll.current) {
      const scrollContainer = scroll.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  };

  const handleScroll = (e) => {
    if (scroll.current) {
      const scrollContainer = scroll.current;
      if (scrollContainer.scrollTop === 0 && e.deltaY < 0) {
        // console.log("스크롤이 맨 위에 있습니다.");
        setDataPage((prevCount) => prevCount - 1);
        setDataSize((prevCount) => prevCount + 10);
      } else {
      }
    }
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     scrollToBottom();
  //   }, 200);
  //   setAtBottom(true);
  // }, []);

  data && isSuccess && scrollToBottom();

  console.log("cc", isSuccess && data, reversedList);

  useEffect(() => {
    scrollToBottom();
  }, [message.data]);

  return (
    <>
      <div className="chat_wrap" ref={scroll} onWheel={(e) => handleScroll(e)}>
        <div className="chat_list">
          {isLoading && "로딩중.."}
          {/* 이전 대화리스트 */}
          {data &&
            isSuccess &&
            reversedList.map((item, i) => (
              <div
                key={i}
                className={classNames("chat-item", {
                  "is-my": nickname === item.sender,
                })}
              >
                {nickname === item.sender ? (
                  <>
                    <span className="createDate">{dayChat(item.createDate)}</span>
                    {/* <span className="message" dangerouslySetInnerHTML={{ __html: item.message }}></span> */}
                    <span className="message">{lineConverter(item.message)}</span>
                  </>
                ) : (
                  <>
                    <span className="sender">{item.sender}</span>
                    {/* <span className="message" dangerouslySetInnerHTML={{ __html: item.message }}></span> */}
                    <span className="message">{lineConverter(item.message)}</span>
                    <span className="createDate">{dayChat(item.createDate)}</span>
                  </>
                )}
              </div>
            ))}
          {/* 추가된 대화리스트 */}
          {message.data.map(
            (item, i) =>
              i !== 0 && (
                <div
                  key={i}
                  className={classNames("chat-item", {
                    "is-my": nickname === item.sender,
                  })}
                >
                  {nickname === item.sender ? (
                    <>
                      <span className="createDate">{dayChat(item.createDate)}</span>
                      <span className="message">{item.message}</span>
                    </>
                  ) : (
                    <>
                      <span className="sender">{item.sender}</span>
                      <span className="message">{item.message}</span>
                      <span className="createDate">{dayChat(item.createDate)}</span>
                    </>
                  )}
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default ChatList;

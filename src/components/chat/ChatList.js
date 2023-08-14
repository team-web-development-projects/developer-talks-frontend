import axios from "axios";
import classNames from "classnames";
import { ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { dayChat } from "util/day";
import "./chat.scss";

const ChatList = ({ postId, upText }) => {
  const auth = useSelector((state) => state.authToken);
  const nickname = auth && parseJwt(auth.accessToken).nickname;

  async function getChatList() {
    const { data } = await axios.get(`${ROOT_API}/${postId}/chats`, {
      params: { page: 0, size: 10 },
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": auth.accessToken,
      },
    });
    return data;
  }

  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ["chatList"],
    queryFn: getChatList,
  });

  console.log("data:", data && data);
  const reversedList = data && [...data.content].reverse();
  console.log("c", reversedList);
  const message = useSelector((state) => state.chatStore);
  console.log("upText", message.data);

  return (
    <div className="chat_list">
      {/* 이전 대화리스트 */}
      {data &&
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
                <span className="message" dangerouslySetInnerHTML={{ __html: item.message }}></span>
              </>
            ) : (
              <>
                <span className="sender">{item.sender}</span>
                <span className="message" dangerouslySetInnerHTML={{ __html: item.message }}></span>
                {/* <span className="message">{item.message}</span> */}
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
  );
};

export default ChatList;

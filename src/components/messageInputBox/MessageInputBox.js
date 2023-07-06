import axios from "axios";
import { showToast } from "components/toast/showToast";
import { ROOT_API } from "constants/api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import s from "./messageinputbox.module.scss";
import Button from "components/button/Button";

const MessageInputBox = ({ datas, setDatas, type }) => {
  const auth = useSelector((state) => state.authToken);

  useEffect(() => {
    fetchMessages();
  }, [type]);

  const fetchMessages = () => {
    axios
      .get(`${ROOT_API}/messages/${type}`, {
        headers: {
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then((response) => {
        const datas = response.data;
        setDatas(datas);
      });
  };

  const deleteMessage = (id) => {
    axios
      .delete(`${ROOT_API}/messages/${type}/${id}`, {
        headers: {
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then((response) => {
        setDatas((prevDatas) => prevDatas.filter((data) => data.id !== id));
        showToast("success", "😎 쪽지가 삭제되었었습니다.");
      })
      .catch((error) => {
        showToast("error", "😎 정보를 다시 확인해주세요.");
      });
  };

  return (
    <div className={s.messageinboxcontainer}>
      <ul className={s.messagelistcontainer}>
        {datas.map((data) => (
          <li key={data.id} className={s.messagelist}>
            <div className={s.messageitem}>
              <div className={s.flex}>
                <div className={s.sender}>{data.receiverNickname}</div>
                <div className={s.timestamp}>{data.senderNickname}</div>
                <div className={s.content}>
                  <p>{data.text}</p>
                </div>
              </div>
              <Button onClick={() => deleteMessage(data.id)} size="small" theme="cancle">
                {" "}
                삭제{" "}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageInputBox;

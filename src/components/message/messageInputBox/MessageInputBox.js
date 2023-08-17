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

  console.log('type', type);

  const fetchMessages = () => {
    axios
      .get(`${ROOT_API}/messages/${type}`, {
        headers: {
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then((response) => {
        const datas = response.data;
        console.log('recive data', datas);
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
    <div className={s.message_box}>
      <ul className={s.message_list}>
        {datas ? datas.map((data) => (
          <li key={data.id} className={s.messagelist}>
            <div className={s.messageitem}>
              <div className={s.flex}>
                <span className={s.sender}>{data.receiverNickname}</span> <span className={s.timestamp}>보낸 시간</span>
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
        )) : <li>내용이 없습니다.</li>}
      </ul>
    </div>
  );
};

export default MessageInputBox;

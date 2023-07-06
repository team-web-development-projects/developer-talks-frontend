import MessageForm from "components/messageForm/MessageForm";
import MessageInbox from "components/messageInputBox/MessageInputBox";
import MessageSearch from "components/messageSearch/MessageSearch";
import { useState } from "react";
import s from "./mymessage.module.scss";

const MyMessage = () => {
  const [datas, setDatas] = useState([]);
   const [showForm, setShowForm] = useState(false);

     const toggleForm = () => {
       setShowForm(!showForm);
     };

  return (
    <div className={s.messageContainer}>
      <button className={s.showFormButton} onClick={toggleForm}>
        쪽지 작성하기
      </button>
      {showForm && <MessageForm setDatas={setDatas} />}
      <MessageSearch />
      <MessageInbox datas={datas} setDatas={setDatas} />
    </div>
  );
};

export default MyMessage;

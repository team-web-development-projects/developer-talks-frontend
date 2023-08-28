import Button from "components/button/Button";
import MessageForm from "components/message/messageForm/MessageForm";
import MessageList from "components/message/messageList/MessageList";
import MessageSearch from "components/message/messageSearch/MessageSearch";
import { useState } from "react";
import s from "../../mypagecontent.module.scss";
import message from "./mymessage.module.scss";

const MyMessage = () => {
  const [select, setSelect] = useState(0);
  const [showForm, setShowForm] = useState(false);
  
  const onSelect = (type) => {
    setSelect(type);
  };
  const contacts = ["내가 쓴 쪽지", "받은 쪽지"];

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  let type;
  if (select === 0) {
    type = "sent";
  } else {
    type = "received";
  }
  
  return (
    <section className={s.contentWrap}>
      <ul className={s.nav}>
        {contacts.map((contact, index) => (
          <li key={index}>
            <button onClick={() => onSelect(index)} className={`${select === index ? `${s.select}` : ""}`}>
              {contact}
            </button>
          </li>
        ))}
      </ul>
      <div className={s.messageContainer}>
        <Button onClick={toggleForm} size="small" classname={message.message_button}>
          쪽지 작성하기
        </Button>
        {showForm && <MessageForm setOnModal={setShowForm} />}
        <MessageSearch />
        <MessageList type={type} />
      </div>
    </section>
  );
};

export default MyMessage;

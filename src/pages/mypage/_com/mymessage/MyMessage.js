import MessageForm from "components/messageForm/MessageForm";
import MessageInbox from "components/messageInputBox/MessageInputBox";
import MessageSearch from "components/messageSearch/MessageSearch";
import { useState } from "react";
import s from "../../mypagecontent.module.scss";

const MyMessage = () => {
  const [select, setSelect] = useState(0);
  const [datas, setDatas] = useState([]);
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
        <button className={s.showFormButton} onClick={toggleForm}>
          쪽지 작성하기
        </button>
        {showForm && <MessageForm setDatas={setDatas} />}
        <MessageSearch />
        <MessageInbox datas={datas} setDatas={setDatas} type={type} />
      </div>
    </section>
  );
};

export default MyMessage;

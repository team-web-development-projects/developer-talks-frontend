import axios from "axios";
import { ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import { useSelector } from "react-redux";
import s from "./messageform.module.scss";
import { useForm } from "react-hook-form";
import { showToast } from "components/toast/showToast";

const MessageForm = ({setDatas}) => {
//   const [datas, setDatas] = useState([]);
  const auth = useSelector((state) => state.authToken);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async () => {
    axios
      .post(
        `${ROOT_API}/messages`,
        {
          senderNickname: parseJwt(auth.accessToken).nickname,
          receiverNickname: watch().receiverNickname,
          text: watch().text,
        },
        { headers: { "X-AUTH-TOKEN": auth.accessToken } }
      )
      .then((response) => {
        console.log(response.data);
        showToast("success", "😎 쪽지가 발송되었었습니다.");
        setDatas((prevdatas) => [
          ...prevdatas,
          { id: response.data, senderNickname: parseJwt(auth.accessToken).nickname, receiverNickname: watch().receiverNickname, text: watch().text },
        ]);
      })
      .catch((error) => {
        console.log(error);
        showToast("errors", "😎 정보를 다시 확인해주세요.");
      });
  };

  return (
      <form className={s.messageForm} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className={s.messageInput}
          placeholder="받는사람을 입력하세요"
          id="receiverNickname"
          tabIndex="2"
          {...register("receiverNickname", { required: true })}
        />
        <input
          type="text"
          className={s.messageInput}
          placeholder="메세지를 입력하세요"
          id="text"
          tabIndex="2"
          {...register("text", { required: true })}
        />
        <button type="submit" className={s.messageButton} disabled={!isValid}>
          전송
        </button>
      </form>
  );
};

export default MessageForm;

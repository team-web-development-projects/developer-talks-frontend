import { sendMessage } from "api/user";
import classNames from "classnames";
import Button from "components/button/Button";
import { Modal } from "components/portalModal/Modal";
import { showToast } from "components/toast/showToast";
import { parseJwt } from "hooks/useParseJwt";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import s from "./messageform.module.scss";

const MessageForm = ({ userinfo, setOnModal, type }) => {
  const queryClient = useQueryClient();
  const handleInputChange = (event) => {
    event.stopPropagation(); // 클릭 이벤트 전파 중지
  };
  const auth = useSelector((state) => state.authToken);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const sendMessageMutation = useMutation(
    () =>
      sendMessage(parseJwt(auth.accessToken).nickname, userinfo?.nickname || watch().receiverNickname, watch().text),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getMessageList"]);
        showToast("success", "쪽지가 발송되었습니다.");
        setOnModal(false);
        reset();
      },
    }
  );

  const onSubmit = async (e) => {
    sendMessageMutation.mutate();
  };

  return (
    <form
      className={classNames(s.messageForm, {
        [s.is_modal]: type === "message-in-modal",
      })}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        className={s.messageInput}
        placeholder="받는사람을 입력하세요"
        id="receiverNickname"
        tabIndex="2"
        disabled={userinfo?.nickname}
        value={userinfo?.nickname ? userinfo.nickname : watch().receiverNickname}
        {...register("receiverNickname", { required: userinfo?.nickname ? false : true })}
        onClick={handleInputChange}
      />
      <input
        type="text"
        className={s.messageInput}
        placeholder="메세지를 입력하세요"
        id="text"
        tabIndex="2"
        {...register("text", { required: true })}
        onClick={handleInputChange}
      />
      <Modal.Buttons>
        <Button type="submit" disabled={!isValid} size="small">
          전송
        </Button>
        <Button size="small" theme="cancle" onClick={() => setOnModal(false)}>
          취소
        </Button>
      </Modal.Buttons>
    </form>
  );
};

export default MessageForm;

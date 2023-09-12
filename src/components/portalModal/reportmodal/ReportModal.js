import { postBoardReport, postUserReport } from "api/user";
import Button from "components/button/Button";
import { showToast } from "components/toast/showToast";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { Modal } from "../Modal";
import s from "./reportmodal.module.scss";

const ReportModal = ({ setOnModal, userinfo, type, postId }) => {
  const queryClient = useQueryClient();
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
  const handleInputChange = (event) => {
    event.stopPropagation(); // 클릭 이벤트 전파 중지
  };
  const userReportMutation = useMutation(() => postUserReport(userinfo?.nickname || watch().nickname, watch().reportType, watch().detail), {
    onSuccess: () => {
      showToast("success", "신고가 접수되었습니다.");
      setOnModal(false);
      reset();
    },
  });

  const boardReportMutation = useMutation(() => postBoardReport(postId, watch().reportType, watch().detail), {
    onSuccess: () => {
      showToast("success", "신고가 접수되었습니다.");
      setOnModal(false);
      reset();
    },
  });

  const onSubmit = async (e) => {
    if (type === "user") userReportMutation.mutate();
    else boardReportMutation.mutate();
  };

  return (
    <form className={s.messageForm} onSubmit={handleSubmit(onSubmit)}>
      {type === "user" && (
        <input
          type="text"
          className={s.messageInput}
          placeholder="받는사람을 입력하세요"
          id="nickname"
          tabIndex="2"
          disabled={userinfo?.nickname}
          value={userinfo?.nickname ? userinfo.nickname : watch().receiverNickname}
          {...register("nickname", { required: userinfo?.nickname ? false : true })}
          onClick={handleInputChange}
        />
      )}
      <select name="" id="" {...register("reportType", { required: true })}>
        <option value="SWEAR_WORD">부적절한 언어</option>
        <option value="SPAM">스팸</option>
        <option value="OTHER">기타</option>
      </select>
      <input
        type="text"
        className={s.messageInput}
        placeholder="신고 사유를 작성해주세요"
        id="detail"
        tabIndex="2"
        {...register("detail", { required: true })}
        onClick={handleInputChange}
      />
      <Modal.Buttons>
        <Button type="submit" disabled={!isValid} size="small">
          신고
        </Button>
        <Button size="small" theme="cancle" onClick={() => setOnModal(false)}>
          취소
        </Button>
      </Modal.Buttons>
    </form>
  );
};

export default ReportModal;

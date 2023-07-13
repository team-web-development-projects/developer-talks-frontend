import { deleteUser } from "api/user";
import { showToast } from "components/toast/showToast";
import { useMutation } from "react-query";

export const useDeleteUser = (navigate,password, auth) => {
  return useMutation(deleteUser(password, auth), {
    onSuccess: () => {
      showToast("success", "😎 유저 삭제 되었습니다.");
      navigate(`/`);
    },
    onError: () => {
      showToast("error", "😎 정보를 다시 확인해주세요.");
    },
  });
};

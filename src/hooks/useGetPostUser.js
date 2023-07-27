import { useQuery } from "react-query";
import { getPostUser } from "api/postuser";
import { emailCheck, getValidateDuplicate } from "api/user";
import { showToast } from "components/toast/showToast";
export const useGetPostUser = (fetchPostUser) => {
  return useQuery(["fetchPostUser", { fetchPostUser }], () => getPostUser(fetchPostUser), {
    keepPreviousData: true,
  });
};

// export const useGetValidateDuplicate = (type, value) => {
//   return useQuery(["fetchValidateDuplicate", type, value], () => getValidateDuplicate(type, value), {
//     // onError: (error) => {
//       // showToast("error", "😎 중복체크를 제대로 확인해주세요");
//       // console.error(error);
//     // },
//     keepPreviousData: true,
//   });
// };

// export const useEmailCheck = (inputEmail) => {
//   const emailCheckQuery = useQuery(["inputEmail", { inputEmail }], () => emailCheck(inputEmail), {
//     onSuccess: () => {
//       showToast("success", "😎 인증이 확인되었습니다");
//     },
//     onError: () => {
//       showToast("error", "인증을 정확히 확인해주세요");
//     },
//   })
//   const handleEmailCheck = (inputEmail) => {
//     emailCheckQuery.refetch();
//   };
// };

export const useEmailCheck = (inputEmail) => {
  const handleEmailCheck = () => {
    emailCheckQuery.refetch();
  };
  const emailCheckQuery = useQuery("inputEmail", () => emailCheck(inputEmail));
  return { emailCheckQuery, handleEmailCheck };
};
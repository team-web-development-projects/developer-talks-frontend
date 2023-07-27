import { useQuery } from "react-query";
import { getPostUser } from "api/postuser";

export const useGetPostUser = (fetchPostUser) => {
  return useQuery(["fetchPostUser", { fetchPostUser }], () => getPostUser(fetchPostUser), {
    keepPreviousData: true,
  });
};
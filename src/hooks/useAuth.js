import { useSelector } from "react-redux";
import { parseJwt } from "./useParseJwt";

export function getUer(token) {
  const getNickname = parseJwt(token).nickname;
  return { getNickname };
}

export function useGetAuth() {
  const auth = useSelector((state) => state.authToken);
  return { auth }
}
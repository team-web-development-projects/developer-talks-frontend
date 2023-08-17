import { parseJwt } from "./useParseJwt";

export function getUer(token) {
  const getNickname = parseJwt(token).nickname;
  return { getNickname };
}

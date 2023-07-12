import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setRefreshToken = (refreshToken) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 1);

  // return cookies.set("refresh_token", refreshToken, {
  //   sameSite: "strict",
  //   path: "/Agreement",
  //   expires: new Date(expireDate),
  // });
  return cookies.set("refresh_token", refreshToken);
};

export const getCookieToken = () => {
  return cookies.get("refresh_token");
};

export const removeCookieToken = () => {
  //NOTE 로그아웃
  return cookies.remove("refresh_token");
};

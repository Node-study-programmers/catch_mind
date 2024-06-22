import { httpClient } from "./http";

export const replacePassword = async (data: { password: string }) => {
  const res = await httpClient.put("/mypage/passwordReset", data);
  return res.data;
};

export const replaceNickName = async (data: { nickname: string }) => {
  const res = await httpClient.put<{ nickname: string }>("/mypage/changeNickname", data);
  return res.data;
};

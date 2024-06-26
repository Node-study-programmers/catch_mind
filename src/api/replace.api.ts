import { httpClient } from "./http";

export const replacePassword = async (data: { password: string }) => {
  const res = await httpClient.put("/mypage/passwordReset", data);
  return res.data;
};

export const replaceNickName = async (data: { nickname: string }) => {
  const res = await httpClient.put<{ nickname: string }>(
    "/mypage/changeNickname",
    data
  );
  return res.data;
};

export const replaceProfileImage = async (formData: FormData) => {
  const res = await httpClient.put<{ profileImage: string }>(
    "/mypage/changeImage",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", // Content-Type 설정
      },
    }
  );
  return res.data;
};

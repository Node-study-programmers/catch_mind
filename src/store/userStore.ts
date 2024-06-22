import { create } from "zustand";
import { User } from "../types";
import { persist } from "zustand/middleware";

interface Store {
  //스토어 타입들
  user: User;
  setUser: (user: User) => void;
}

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const userStore = create(
  persist<Store>(
    (set) => ({
      user: {
        email: null,
        nickname: null,
        profileImage: null,
        score: null,
      },
      setUser: (userInfo: User) =>
        set({
          user: {
            email: userInfo.email,
            nickname: userInfo.nickname,
            profileImage: userInfo.profileImage,
            score: userInfo.score,
          },
        }),
    }),
    { name: "userInfo" }
  )
);

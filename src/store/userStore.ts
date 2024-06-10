import { create } from "zustand";
import { User } from "../types";

interface Store {
  //스토어 타입들
  user: User;
  setUser: (user: User) => void;
}

export const userStore = create<Store>(set => ({
  user: { userId: null, nickName: null, imgUrl: null },
  setUser: (user: User) => set({ user }),
}));

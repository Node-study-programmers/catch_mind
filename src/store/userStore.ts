import { create } from 'zustand';
import { User } from '../types';

interface Store {
  //스토어 타입들
  user: User;
  setUser: (user: User) => void;
}

export const userStore = create<Store>(set => ({
  user: { userId: '유저 아이디', nickName: '유저 닉넴', imgUrl: 'testetset' },
  setUser: (user: User) => set({ user }),
}));

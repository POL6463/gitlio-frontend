// store/userStore.ts
import { create } from 'zustand';

interface UserState {
  userId: number | null;
  clerkId: string;
  email: string;
  name: string | null; // 여기를 수정
  setUser: (user: Omit<UserState, 'userId'>) => void;
  setUserId: (userId: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  clerkId: '',
  email: '',
  name: null, // 초기값도 null 가능하도록 변경
  setUser: (user) => set({ ...user }),
  setUserId: (userId) => set({ userId }),
}));

'use client';
import { create } from 'zustand';

interface ProfileState {
  title: string;
  profileImage: string;
  infoContent: string;
  tagList: string[];
}

interface ProfileStore {
  profile: ProfileState;
  setProfileTitle: (title: string) => void;
  setProfileImage: (profileImage: string) => void;
  setInfoContent: (infoContent: string) => void;
  setTagList: (tagList: string[]) => void;
}

const localStorageKey = 'profile-store';

// localStorage에서 프로필 상태를 불러오는 함수
const loadProfileFromLocalStorage = (): ProfileState => {
  try {
    const storedProfile = localStorage.getItem(localStorageKey);
    if (storedProfile) {
      return JSON.parse(storedProfile);
    }
  } catch (error) {
    console.error('Failed to load state from localStorage', error);
  }

  return {
    title: '',
    profileImage: '',
    infoContent: '',
    tagList: [],
  };
};

const InfoSidebarStore = create<ProfileStore>((set, get) => ({
  profile: loadProfileFromLocalStorage(),

  setProfileTitle: (title) => {
    set((state) => ({ profile: { ...state.profile, title } }));
  },

  setProfileImage: (profileImage) => {
    set((state) => ({ profile: { ...state.profile, profileImage } }));
  },

  setInfoContent: (infoContent) => {
    set((state) => ({ profile: { ...state.profile, infoContent } }));
  },

  setTagList: (tagList) => {
    set((state) => ({ profile: { ...state.profile, tagList } }));
  },
}));

// 스토어의 구독을 통해 상태가 변경될 때마다 localStorage에 저장합니다.
InfoSidebarStore.subscribe((state) => {
  try {
    localStorage.setItem(localStorageKey, JSON.stringify(state.profile));
  } catch (error) {
    console.error('Failed to save state to localStorage', error);
  }
});

export default InfoSidebarStore;

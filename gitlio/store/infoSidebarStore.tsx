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

const InfoSidebarStore = create<ProfileStore>((set) => ({
  profile: {
    title: '',
    profileImage: '',
    infoContent: '',
    tagList: [],
  },

  setProfileTitle: (title) =>
    set((state) => ({ profile: { ...state.profile, title } })),

  setProfileImage: (profileImage) =>
    set((state) => ({ profile: { ...state.profile, profileImage } })),

  setInfoContent: (infoContent) =>
    set((state) => ({ profile: { ...state.profile, infoContent } })),

  setTagList: (tagList) =>
    set((state) => ({ profile: { ...state.profile, tagList } })),
}));

export default InfoSidebarStore;

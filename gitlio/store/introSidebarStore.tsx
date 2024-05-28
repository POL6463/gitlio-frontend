import { create } from 'zustand';

export interface ProfileState {
  title: string;
  profileImage: string;
  introDescription: string;
  tagList: string[];
}

interface ProfileStore {
  profile: ProfileState;
  setProfileTitle: (title: string) => void;
  setProfileImage: (profileImage: string) => void;
  setIntroDescription: (introDescription: string) => void;
  setTagList: (tagList: string[]) => void;
}

const IntroSidebarStore = create<ProfileStore>((set) => ({
  profile: {
    title: '',
    profileImage: '',
    introDescription: '',
    tagList: [],
  },

  setProfileTitle: (title) => {
    set((state) => ({ profile: { ...state.profile, title } }));
  },

  setProfileImage: (profileImage) => {
    set((state) => ({ profile: { ...state.profile, profileImage } }));
  },

  setIntroDescription: (introDescription) => {
    set((state) => ({ profile: { ...state.profile, introDescription } }));
  },

  setTagList: (tagList) => {
    set((state) => ({ profile: { ...state.profile, tagList } }));
  },
}));

export default IntroSidebarStore;

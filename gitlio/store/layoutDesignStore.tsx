import { create } from 'zustand';

interface LayoutOptions {
  option: string;
  setOption: (option: string) => void;
}

interface SkillLayoutOptions {
  color: string;
  setColor: (color: string) => void;
}

interface LayoutProps {
  intro: LayoutOptions;
  skill: SkillLayoutOptions;
  experience: LayoutOptions;
  project: LayoutOptions;
  contact: LayoutOptions;
}

const useLayoutStore = create<LayoutProps>((set) => ({
  intro: {
    option: 'option3',
    setOption: (option: string) =>
      set((state) => ({ intro: { ...state.intro, option } })),
  },
  skill: {
    option: 'option1',
    color: '#0693E3', // 초기 색상 설정
    setOption: (option: string) =>
      set((state) => ({ skill: { ...state.skill, option } })),
    setColor: (color: string) =>
      set((state) => ({ skill: { ...state.skill, color } })),
  },
  experience: {
    option: 'option1',
    setOption: (option: string) =>
      set((state) => ({ experience: { ...state.experience, option } })),
  },
  project: {
    option: 'option1',
    setOption: (option: string) =>
      set((state) => ({ project: { ...state.project, option } })),
  },
  contact: {
    option: 'option1',
    setOption: (option: string) =>
      set((state) => ({ contact: { ...state.contact, option } })),
  },
}));

export default useLayoutStore;

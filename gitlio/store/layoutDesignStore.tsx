import { create } from 'zustand';

//객체로 그룹화 해서 리팩토링 완료!
interface LayoutOptions {
  option: string;
  setOption: (option: string) => void;
}

interface LayoutProps {
  intro: LayoutOptions;
  skill: LayoutOptions;
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
    setOption: (option: string) =>
      set((state) => ({ skill: { ...state.skill, option } })),
  },
  experience: {
    option: 'option1',
    setOption: (option: string) =>
      set((state) => ({ experience: { ...state.experience, option } })),
  },
  project: {
    option: 'option1',
    setOption: (option: string) =>
      set((state) => ({ experience: { ...state.experience, option } })),
  },
  contact: {
    option: 'option1',
    setOption: (option: string) =>
      set((state) => ({ contact: { ...state.contact, option } })),
  },
}));

export default useLayoutStore;

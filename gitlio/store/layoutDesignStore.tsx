import create from 'zustand';

interface LayoutProps {
  layoutOption: string;
  setLayoutOption: (option: string) => void;
}

const useLayoutStore = create<LayoutProps>((set) => ({
  layoutOption: 'option1',
  setLayoutOption: (option: string): void => set({ layoutOption: option }),
}));

export default useLayoutStore;

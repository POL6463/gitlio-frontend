// store/sidebarStore.ts
import create from 'zustand';

interface SidebarState {
  selectedSection: string;
  setSelectedSection: (section: string) => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  selectedSection: 'information', // 기본값은 "content"
  setSelectedSection: (section) => set({ selectedSection: section }),
}));

export default useSidebarStore;

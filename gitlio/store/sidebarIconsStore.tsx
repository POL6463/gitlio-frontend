import create from 'zustand';
import { IconType } from 'react-icons';

export interface IconBlock {
  id: string;
  logo: IconType;
  label: string;
}

interface SidebarIconsState {
  sidebarIcons: IconBlock[];
  addIcon: (icon: IconBlock) => void;
}

export const useSidebarIconsStore = create<SidebarIconsState>((set) => ({
  sidebarIcons: [],
  addIcon: (icon) =>
    set((state) => ({
      sidebarIcons: [...state.sidebarIcons, icon],
    })),
}));

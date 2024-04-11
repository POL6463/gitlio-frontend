// store/selectedIconsStore.ts
import create from 'zustand';

interface IconOption {
  value: string;
  label: string;
}

interface SelectedIconsState {
  selectedIcons: IconOption[];
  addIcon: (icon: IconOption) => void;
}

export const useSelectedIconsStore = create<SelectedIconsState>((set) => ({
  selectedIcons: [],
  addIcon: (icon) =>
    set((state) => ({
      selectedIcons: [...state.selectedIcons, icon],
    })),
}));

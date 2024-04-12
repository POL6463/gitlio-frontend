import create from 'zustand';
import { IconType } from 'react-icons';

export interface IconBlock {
  id: string;
  logo: IconType;
  label: string;
  areaId: string;
}

export interface DropArea {
  id: string;
  icons: IconBlock[];
}

export interface SidebarIconsState {
  dropAreas: DropArea[];
  activeId: string | null; // 현재 드래그 중인 아이콘의 ID
  setActiveId: (id: string | null) => void; // activeId를 설정하는 액션
  addDropArea: (id?: string) => void; // Optional id parameter for dynamic creation
  addIconToDefaultArea: (icon: IconBlock) => void;
  removeDropArea: (areaId: string) => void;
  moveIcon: (
    iconId: string,
    sourceAreaId: string,
    targetAreaId: string
  ) => void;
}

export const useSidebarIconsStore = create<SidebarIconsState>((set) => ({
  dropAreas: [
    { id: 'default-sidebar', icons: [] }, // 기본 드롭 영역 설정
    { id: 'skill-section', icons: [] }, // Main area
  ],
  activeId: null, // 초기 activeId 값은 null

  setActiveId: (id) => set({ activeId: id }),

  addDropArea: () =>
    set((state) => ({
      dropAreas: [
        ...state.dropAreas,
        { id: `area-${state.dropAreas.length}`, icons: [] },
      ],
    })),

  removeDropArea: (areaId) =>
    set((state) => ({
      dropAreas: state.dropAreas.filter((area) => area.id !== areaId),
    })),

  moveIcon: (iconId, targetAreaId) =>
    set((state) => {
      let found = false;
      let movedIcon;

      // First, remove the icon from its current area
      const updatedAreas = state.dropAreas.map((area) => {
        const iconIndex = area.icons.findIndex((icon) => icon.id === iconId);
        if (iconIndex !== -1) {
          movedIcon = { ...area.icons[iconIndex], areaId: targetAreaId }; // Copy icon and update its areaId
          area.icons.splice(iconIndex, 1); // Actually remove the icon from the current area
          found = true;
        }
        return { ...area, icons: [...area.icons] }; // Return updated area
      });

      if (found && movedIcon) {
        // Now add the icon to the target area
        const targetAreaIndex = updatedAreas.findIndex(
          (area) => area.id === targetAreaId
        );
        if (targetAreaIndex !== -1) {
          updatedAreas[targetAreaIndex].icons.push(movedIcon); // Add the moved icon to the new area
        }
      }

      return { ...state, dropAreas: updatedAreas };
    }),

  addIconToDefaultArea: (icon) =>
    set((state) => {
      const defaultArea = state.dropAreas.find(
        (area) => area.id === 'default-sidebar'
      );
      if (defaultArea) {
        icon.areaId = 'default-sidebar'; // Set the areaId to default
        defaultArea.icons.push(icon);
        console.log('icon.id: ', icon.id);
      }
      return { ...state };
    }),
}));

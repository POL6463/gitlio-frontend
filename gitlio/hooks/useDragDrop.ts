// hooks/useDragDrop.ts
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DragEndEvent,
} from '@dnd-kit/core';
import { useSidebarIconsStore } from '@/store/sidebarIconsStore';

export const useDragDrop = () => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const setActiveId = useSidebarIconsStore((state) => state.setActiveId);
  const moveIcon = useSidebarIconsStore((state) => state.moveIcon);

  const handleDragStart = (event) => {
    // Set the active icon's ID when dragging starts
    setActiveId(event.active.id);
    console.log('Drag started, active ID:', event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over) return;
    console.log('Drag ended, active ID:', active.id, 'over ID:', over?.id);

    const currentIcon = useSidebarIconsStore
      .getState()
      .dropAreas.flatMap((area) => area.icons)
      .find((icon) => icon.id === active.id);
    const currentAreaId = currentIcon ? currentIcon.areaId : null;
    console.log(
      'Current area ID:',
      currentAreaId,
      'current icon:',
      currentIcon
    );

    // Ensure the icon is moved only if dropped on a different area
    if (over?.id !== currentAreaId) {
      moveIcon(active.id, over.id);
    }

    // Clear the active ID after the drag operation is complete
    setActiveId(null);
  };

  return { sensors, handleDragStart, handleDragEnd };
};

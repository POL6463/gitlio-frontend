// hooks/useDragDrop.ts
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DragStartEvent,
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

  const handleDragStart = (event: DragStartEvent) => {
    // Convert to string
    const activeId = String(event.active.id);
    // Set the active icon's ID when dragging starts
    setActiveId(activeId);
    console.log('Drag started, active ID:', activeId);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over) return;
    console.log('Drag ended, active ID:', active.id, 'over ID:', over?.id);

    // Convert to string
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;

    const currentIcon = useSidebarIconsStore
      .getState()
      .dropAreas.flatMap((area) => area.icons)
      .find((icon) => icon.id === activeId);
    const currentAreaId = currentIcon ? currentIcon.areaId : null;
    console.log(
      'Current area ID:',
      currentAreaId,
      'current icon:',
      currentIcon
    );

    // Ensure the icon is moved only if dropped on a different area
    if (overId && overId !== currentAreaId) {
      moveIcon(activeId, overId);
    }

    // Clear the active ID after the drag operation is complete
    setActiveId(null);
  };

  return { sensors, handleDragStart, handleDragEnd };
};

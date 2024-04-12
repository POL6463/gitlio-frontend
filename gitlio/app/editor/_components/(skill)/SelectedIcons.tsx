import React from 'react';
import { useSidebarIconsStore } from '@/store/sidebarIconsStore';
import DraggableIcon from './DraggableIcon';
import { DragOverlay } from '@dnd-kit/core';

const SelectedIcons: React.FC = () => {
  const { dropAreas, activeId } = useSidebarIconsStore();

  // Find the default sidebar area specifically
  const defaultSidebarArea = dropAreas.find(
    (area) => area.id === 'default-sidebar'
  );

  // Find the icon that is currently active across all drop areas, if it belongs to the default-sidebar
  const activeIcon = defaultSidebarArea?.icons.find(
    (icon) => icon.id === activeId
  );

  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {defaultSidebarArea?.icons.map((icon) => (
          <DraggableIcon
            key={icon.id}
            id={icon.id}
            IconComponent={icon.logo}
            label={icon.label}
          />
        ))}
      </div>
      <DragOverlay>
        {activeIcon && (
          <DraggableIcon
            id={activeIcon.id}
            IconComponent={activeIcon.logo}
            label={activeIcon.label}
          />
        )}
      </DragOverlay>
    </>
  );
};

export default SelectedIcons;

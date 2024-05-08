// GlobalDragOverlay.js
import React from 'react';
import { useSidebarIconsStore } from '@/store/sidebarIconsStore';
import DraggableIcon from './DraggableIcon';
import { DragOverlay } from '@dnd-kit/core';

const GlobalDragOverlay = () => {
  const { dropAreas, activeId } = useSidebarIconsStore();

  // 전역 상태에서 현재 활성화된 아이콘 찾기
  const activeIcon = dropAreas
    .flatMap((area) => area.icons)
    .find((icon) => icon.id === activeId);

  return (
    <DragOverlay>
      {activeIcon && (
        <DraggableIcon
          id={activeIcon.id}
          IconComponent={activeIcon.logo}
          label={activeIcon.label}
        />
      )}
    </DragOverlay>
  );
};

export default GlobalDragOverlay;

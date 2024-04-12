import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useSidebarIconsStore } from '@/store/sidebarIconsStore';
import DraggableIcon from './DraggableIcon';

interface DropAreaProps {
  id: string;
}

const DropArea: React.FC<DropAreaProps> = ({ id }) => {
  const { setNodeRef } = useDroppable({ id });
  const { dropAreas } = useSidebarIconsStore();
  const area = dropAreas.find((area) => area.id === id) || { icons: [] };

  return (
    <div ref={setNodeRef} className="drop-area">
      {area.icons.map((icon) => (
        <DraggableIcon
          key={icon.id}
          id={icon.id}
          IconComponent={icon.logo}
          label={icon.label}
        />
      ))}
    </div>
  );
};

export default DropArea;

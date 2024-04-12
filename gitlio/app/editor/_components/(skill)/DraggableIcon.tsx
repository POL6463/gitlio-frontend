import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { IconType } from 'react-icons';

interface DraggableIconProps {
  id: string;
  IconComponent: IconType;
  label: string;
  areaId?: string; // Optional prop if you decide to use it for context
}

const DraggableIcon: React.FC<DraggableIconProps> = ({
  id,
  IconComponent,
  label,
  areaId, // This could be used to apply different styles or logic
}) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  // Example: Conditional class application based on areaId
  const areaClass = areaId ? `area-${areaId}` : 'default-area';

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-2 text-md font-semibold flex justify-center items-center bg-gray-200 rounded-lg cursor-grab ${areaClass}`}
      aria-label={`Draggable icon for ${label}`}
      role="button"
      tabIndex={0}
    >
      <IconComponent />
      <span className="ml-2">{label}</span>
    </div>
  );
};

export default DraggableIcon;

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { IconType } from 'react-icons';
import { FaTimes } from 'react-icons/fa';
import { useSidebarIconsStore } from '@/store/sidebarIconsStore';
import usePreviewStore from '@/store/previewStore';
import { icons } from '@/app/editor/_components/(skill)/icons';

interface DraggableIconProps {
  id: string;
  IconComponent?: IconType;
  label: string;
  areaId?: string;
}

const DraggableIcon: React.FC<DraggableIconProps> = ({
  id,
  IconComponent,
  label,
  areaId,
}) => {
  const logoExists = icons.hasOwnProperty(label);
  if (logoExists) {
    IconComponent = icons[label as keyof typeof icons];
  }

  const areaClass = areaId ? `area-${areaId}` : 'default-area';

  return (
    <div
      className={`p-2 text-md font-semibold flex justify-between items-center bg-gray-200 rounded-lg ${areaClass}`}
      aria-label={`Draggable icon for ${label}`}
      role="button"
      tabIndex={0}
    >
      <div className="flex-grow-1 flex items-center justify-start">
        {' '}
        {/* 드래그 리스너를 이 부분에만 적용 */}
        {IconComponent && <IconComponent />}
        <span className="ml-2 mr-2">{label}</span>
      </div>
    </div>
  );
};

export default DraggableIcon;

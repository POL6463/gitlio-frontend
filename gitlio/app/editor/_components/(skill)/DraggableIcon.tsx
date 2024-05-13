import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { IconType } from 'react-icons';
import { FaTimes } from 'react-icons/fa';
import { useSidebarIconsStore } from '@/store/sidebarIconsStore';
import usePreviewStore from '@/store/previewStore';

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
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  const { removeIcon } = useSidebarIconsStore();
  const { preview } = usePreviewStore(); // Access the preview state

  const handleRemoveIcon = (event) => {
    event.stopPropagation(); // 클릭 이벤트의 전파를 중지하여 드래그 시작을 방지
    console.log('Remove icon', id);
    removeIcon(id);
  };

  const areaClass = areaId ? `area-${areaId}` : 'default-area';

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      className={`p-2 text-md font-semibold flex justify-between items-center bg-gray-200 rounded-lg cursor-grab ${areaClass}`}
      aria-label={`Draggable icon for ${label}`}
      role="button"
      tabIndex={0}
    >
      <div
        {...listeners}
        className="flex-grow-1 flex items-center justify-start"
      >
        {' '}
        {/* 드래그 리스너를 이 부분에만 적용 */}
        {IconComponent && <IconComponent />}
        <span className="ml-2 mr-2">{label}</span>
      </div>
      {!preview && ( // Conditionally render the FaTimes icon based on the preview state
        <FaTimes
          className="text-red-500 cursor-pointer"
          onClick={handleRemoveIcon}
          aria-label="Remove icon"
        />
      )}
    </div>
  );
};

export default DraggableIcon;

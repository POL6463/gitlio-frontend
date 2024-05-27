'use client';
import React from 'react';
import { useSidebarIconsStore } from '@/store/sidebarIconsStore';
import DraggableIcon from './DraggableIcon';
import DraggableIconView from '@/app/editor/_components/(skill)/DraggableIconView';

interface DropAreaProps {
  id: string;
}

const DropArea: React.FC<DropAreaProps> = ({ id }) => {
  const { dropAreas } = useSidebarIconsStore();
  const area = dropAreas.find((area) => area.id === id) || { icons: [] };

  return (
    <div className="min-w-[200px] min-h-[60px] h-auto bg-neutral-content/30 rounded flex flex-wrap items-center justify-center p-2">
      {area.icons.length > 0 ? (
        area.icons.map((icon) => (
          <div className="m-2" key="">
            <DraggableIconView
              key={icon.id}
              id={icon.id}
              IconComponent={icon.logo}
              label={icon.label}
            />
          </div>
        ))
      ) : (
        <p className="text-gray-500">Drop icons here</p>
      )}
    </div>
  );
};

export default DropArea;

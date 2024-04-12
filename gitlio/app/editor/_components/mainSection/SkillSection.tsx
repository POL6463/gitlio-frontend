import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useSidebarIconsStore } from '@/store/sidebarIconsStore';
import DraggableIcon from '@/app/editor/_components/(skill)/DraggableIcon';

const SkillSection: React.FC = () => {
  const { setNodeRef } = useDroppable({
    id: 'skill-section',
  });
  const { dropAreas } = useSidebarIconsStore();

  const skillSectionArea = dropAreas.find(
    (area) => area.id === 'skill-section'
  );

  return (
    <div
      ref={setNodeRef}
      className="bg-white w-[800px] min-h-[200px] mr-32 rounded-xl flex flex-col flex-1 justify-start p-4 z-10"
    >
      <h1 className="text-3xl font-semibold ml-10">#Tech Stack</h1>
      <div className="flex flex-wrap">
        {skillSectionArea ? (
          skillSectionArea.icons.map((icon, index) => (
            <DraggableIcon
              key={index}
              id={icon.id}
              IconComponent={icon.logo}
              label={icon.label}
            />
          ))
        ) : (
          <p>Loading icons or no icons available...</p>
        )}
      </div>
    </div>
  );
};

export default SkillSection;

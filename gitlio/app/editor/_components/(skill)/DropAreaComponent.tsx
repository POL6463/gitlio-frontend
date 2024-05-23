// DropAreaComponent.tsx
import React from 'react';
import { useSidebarIconsStore } from '@/store/sidebarIconsStore';
import DropArea from './DropArea';
import useLayoutStore from '@/store/layoutDesignStore';

const DropAreaComponent: React.FC = () => {
  const { dropAreas } = useSidebarIconsStore();
  const { skill } = useLayoutStore();

  return (
    <>
      {dropAreas.slice(1).map((area) => (
        <div key={area.id} className="mb-4 last:mb-0">
          <div className="bg-white rounded-lg overflow-hidden">
            {/* 타이틀 표시 추가 */}
            <div
              className={`p-2 ${skill.option === 'option2' ? 'bg-red-400' : 'bg-blue-500'} text-white text-center font-bold`}
            >
              {area.title}
            </div>
            <DropArea id={area.id} />
          </div>
        </div>
      ))}
    </>
  );
};

export default DropAreaComponent;

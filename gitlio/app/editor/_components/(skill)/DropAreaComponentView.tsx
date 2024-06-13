import React from 'react';
import { useSidebarIconsStore } from '@/store/sidebarIconsStore';
import DropArea from './DropArea';
import useLayoutStore from '@/store/layoutDesignStore';
import DropAreaView from '@/app/editor/_components/(skill)/DropAreaView';

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
              className="p-2 text-white text-center font-bold"
              style={{ backgroundColor: skill.color }}
            >
              {area.title}
            </div>
            <DropAreaView id={area.id} />
          </div>
        </div>
      ))}
    </>
  );
};

export default DropAreaComponent;

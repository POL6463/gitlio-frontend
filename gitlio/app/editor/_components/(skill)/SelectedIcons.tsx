import React from 'react';
import { icons } from './icons';
import { useSidebarIconsStore } from '@/store/sidebarIconsStore';

const SelectedIcons = () => {
  const { sidebarIcons } = useSidebarIconsStore();

  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      {sidebarIcons.map((icon, index) => {
        const IconComponent = icon.logo;
        return (
          <div
            key={index}
            className="p-2 text-md font-semibold flex justify-center items-center bg-gray-200 rounded-lg"
          >
            <IconComponent />
            <span className="ml-2">{icon.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SelectedIcons;

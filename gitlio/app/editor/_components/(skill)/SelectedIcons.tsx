import React from 'react';
import { icons } from './icons';
import { useSelectedIconsStore } from '@/store/selectedIconsStore';

const SelectedIcons = () => {
  const { selectedIcons } = useSelectedIconsStore();

  return (
    <div className="flex flex-wrap justify-start items-center gap-4">
      {selectedIcons.map((icon, index) => {
        const IconComponent = icons[icon.value as keyof typeof icons];
        return (
          <div
            key={index}
            className="p-2 text-xl flex justify-center items-center bg-gray-200 rounded"
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

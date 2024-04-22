import React from 'react';
import DropAreaComponent from '@/app/editor/_components/(skill)/DropAreaComponent';

const SkillSection: React.FC = () => {
  return (
    <div className="bg-white w-[800px] min-h-[200px] mr-32 rounded-xl flex flex-col flex-1 justify-start p-4 z-10">
      <h1 className="text-3xl font-semibold ml-10 mb-6">#Tech Stack</h1>
      <DropAreaComponent />
    </div>
  );
};

export default SkillSection;

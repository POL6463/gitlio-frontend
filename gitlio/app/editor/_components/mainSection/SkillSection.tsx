'use client';
import React from 'react';
import DropAreaComponent from '@/app/editor/_components/(skill)/DropAreaComponent';
import DropAreaComponentView from '@/app/editor/_components/(skill)/DropAreaComponentView';

const SkillSection: React.FC = () => {
  return (
    <div className="bg-white w-[800px] min-h-[200px] flex flex-col justify-start rounded-xl">
      <br />
      <h1 className="text-3xl font-semibold ml-10 mr-5">#Tech Stack</h1>
      <div className="px-10 py-10">
        <DropAreaComponentView />
      </div>
    </div>
  );
};

export default SkillSection;

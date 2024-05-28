'use client';
import React from 'react';
import experienceSectionStore from '@/store/experienceSectionStore'; // 경로는 프로젝트에 맞게 조정하세요.
import useLayoutStore from '@/store/layoutDesignStore';
import ExperienceOptionOne from './experienceLayoutOptions/ExperienceOptionOne';
import ExperienceOptionTwo from './experienceLayoutOptions/ExperienceOptionTwo';

export default function ExperienceSection() {
  const { sections } = experienceSectionStore(); // 스토어에서 sections 상태를 가져옵니다.
  const { experience } = useLayoutStore();
  const { option } = experience;

  return (
    <div className="bg-white w-[800px] min-h-[200px] rounded-xl flex flex-col flex-1 justify-start">
      <br />
      <h1 className="text-3xl font-semibold ml-10 mr-5">#Experience</h1>
      {option === 'option1' && <ExperienceOptionOne sections={sections} />}
      {option === 'option2' && <ExperienceOptionTwo sections={sections} />}
    </div>
  );
}

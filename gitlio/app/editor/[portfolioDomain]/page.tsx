'use client';
import ExperienceSection from '@/app/editor/_components/mainSection/ExperienceSection';
import useSidebarStore from '@/store/sidebarStore';
import InfoSection from '@/app/editor/_components/mainSection/InfoSection';
import SkillSection from '@/app/editor/_components/mainSection/SkillSection';
import ProjSection from '../_components/mainSection/ProjSection';

export default function EditPage() {
  const setSelectedSection = useSidebarStore(
    (state) => state.setSelectedSection
  );

  return (
    <div className="">
      <div
        onClick={() => setSelectedSection('information')}
        className="mb-4 cursor-pointer"
      >
        <InfoSection />
      </div>
      <div
        onClick={() => setSelectedSection('skill')}
        className="mb-4 cursor-pointer"
      >
        <SkillSection />
      </div>
      <div
        onClick={() => setSelectedSection('experience')}
        className="mb-4 cursor-pointer"
      >
        <ExperienceSection />
      </div>
      <div
        onClick={() => setSelectedSection('experience')}
        className="mb-4 cursor-pointer"
      >
        <ProjSection />
      </div>
      {/* 다른 섹션들 추가 가능 */}
    </div>
  );
}

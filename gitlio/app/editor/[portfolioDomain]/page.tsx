'use client';
import ExperienceSection from '@/app/editor/_components/mainSection/ExperienceSection';
import useSidebarStore from '@/store/sidebarStore';
import IntroSection from '@/app/editor/_components/mainSection/IntroSection';
import SkillSection from '@/app/editor/_components/mainSection/SkillSection';
import ContactSection from '@/app/editor/_components/mainSection/ContactSection';
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
        <IntroSection />
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
        className="mb-4 cursor-pointer"
      >
        <ProjSection />
      </div>
      <div
        onClick={() => setSelectedSection('contact')}
        className="mb-4 cursor-pointer"
      >
        <ContactSection />
      </div>
      {/* 다른 섹션들 추가 가능 */}
    </div>
  );
}

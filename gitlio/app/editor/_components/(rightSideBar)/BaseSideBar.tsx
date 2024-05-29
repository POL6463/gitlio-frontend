'use client';
import cx from 'classnames';
import ExperienceSideBar from '@/app/editor/_components/(rightSideBar)/ExperienceSideBar';
import useSidebarStore from '@/store/sidebarStore';
import SkillSideBar from '@/app/editor/_components/(rightSideBar)/SkillSideBar'; // 스토어 경로는 실제 경로에 맞게 조정하세요.
import IntroSideBar from './IntroSideBar';
import ContactSideBar from './ContactSideBar';
import ProjectSideBar from './ProjectSideBar';
import { useState } from 'react';
import SectionLayout from '../(sideBarLayout)/SectionLayout';

export default function BaseSideBar() {
  const { selectedSection, setSelectedSection } = useSidebarStore();
  const [layoutSelected, setLayoutSelected] = useState<boolean>(false); //탭 선택을 관리해주는 상태관리

  return (
    <div className="flex flex-col items-center w-[450px] h-dvh bg-white border-base-300 border-2 overflow-y-auto overscroll-contain pb-16">
      <div
        role="tablist"
        className="tabs bg-neutral-300 tabs-boxed my-6 grid grid-flow-col auto-cols-fr"
      >
        <a
          role="tab"
          className={cx('tab', !layoutSelected && 'bg-base-100')}
          onClick={() => setLayoutSelected(false)}
        >
          Content
        </a>
        <a
          role="tab"
          className={cx('tab', layoutSelected && 'bg-base-100')}
          onClick={() => setLayoutSelected(true)}
        >
          Layout
        </a>
      </div>
      {!layoutSelected && selectedSection === 'experience' && (
        <ExperienceSideBar />
      )}
      {!layoutSelected && selectedSection === 'skill' && <SkillSideBar />}
      {!layoutSelected && selectedSection === 'introduction' && (
        <IntroSideBar />
      )}
      {!layoutSelected && selectedSection === 'project' && <ProjectSideBar />}
      {!layoutSelected && selectedSection === 'contact' && <ContactSideBar />}
      {layoutSelected && <SectionLayout section={selectedSection} />}
    </div>
  );
}

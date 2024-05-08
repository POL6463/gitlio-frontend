'use client';
import cx from 'classnames';
import ExperienceSideBar from '@/app/editor/_components/(rightSideBar)/ExperienceSideBar';
import useSidebarStore from '@/store/sidebarStore';
import SkillSideBar from '@/app/editor/_components/(rightSideBar)/SkillSideBar'; // 스토어 경로는 실제 경로에 맞게 조정하세요.
import IntroSideBar from './IntroSideBar';

export default function BaseSideBar() {
  const { selectedSection, setSelectedSection } = useSidebarStore();
  const layoutSelected = false;

  return (
    <div className="flex flex-col items-center w-[450px] h-dvh bg-white border-base-300 border-2 overflow-y-auto overscroll-contain pb-16">
      <div
        role="tablist"
        className="tabs bg-neutral-300 tabs-boxed my-6 grid grid-flow-col auto-cols-fr"
      >
        <a role="tab" className={cx('tab', !layoutSelected && 'bg-base-100')}>
          Content
        </a>
        <a role="tab" className={cx('tab', layoutSelected && 'bg-base-100')}>
          Layout
        </a>
      </div>
      {selectedSection === 'experience' && <ExperienceSideBar />}
      {selectedSection === 'skill' && <SkillSideBar />}
      {selectedSection === 'information' && <IntroSideBar />}
    </div>
  );
}

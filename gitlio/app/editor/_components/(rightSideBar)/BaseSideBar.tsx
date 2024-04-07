'use client';
import cx from 'classnames';
import ExperienceSideBar from '@/app/editor/_components/(rightSideBar)/ExperienceSideBar';
import useSidebarStore from '@/store/sidebarStore';

export default function BaseSideBar() {
  const { selectedSection, setSelectedSection } = useSidebarStore();
  const layoutSelected = false;

  return (
    <div className="flex flex-col items-center min-w-[450px] h-dvh bg-white border-base-300 border-2 overflow-y-auto overscroll-contain">
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
    </div>
  );
}

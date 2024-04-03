'use client';
import cx from 'classnames';
import TopBar from '@/app/editor/_components/TopBar';
import LeftSidebar from '@/app/editor/_components/LeftSidebar';
import BaseSideBar from '@/app/editor/_components/(rightSideBar)/BaseSideBar';

type Props = {
  children: React.ReactNode;
};
export default function EditorLayout({ children }: Props) {
  return (
    <div className="flex flex-col h-fit">
      {' '}
      {/* 전체 레이아웃을 화면 높이에 맞춤 */}
      <TopBar />
      <div className="flex justify-between w-full bg-base-200 mt-16 h-full">
        {' '}
        {/* 높이를 전체로 설정 */}
        <div className="fixed left-0 top-16 bottom-0 overscroll-none">
          {' '}
          {/* 좌측 사이드바에 스크롤 적용 */}
          <LeftSidebar />
        </div>
        <div className="flex-grow flex justify-center items-start overflow-hidden overscroll-none">
          <div className="mt-5 h-full overflow-hidden w-full max-w-3xl px-4">
            {' '}
            {/* `children` 영역을 뷰포트 높이에 맞추고 스크롤 적용 */}
            {children}
          </div>
        </div>
        <div className="fixed right-0 top-16 bottom-0 overflow-y-auto overscroll-none">
          {' '}
          {/* 우측 사이드바에 스크롤 적용 */}
          <BaseSideBar />
        </div>
      </div>
    </div>
  );
}

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
    <div className="flex flex-col min-h-screen bg-base-200">
      <TopBar />
      {/* TopBar 아래에 메인 컨텐츠와 사이드바들을 배치하기 위한 컨테이너 */}
      <div className="flex flex-grow">
        <div className="flex w-full">
          {/* 좌측 사이드바 */}
          <div className="flex-none mt-16">
            <LeftSidebar />
          </div>
          {/* 메인 컨텐츠가 위치할 부분 */}
          <div className="flex-1 flex justify-center overflow-auto">
            <div className="w-full max-w-4xl py-4 mt-16">{children}</div>
          </div>
          {/* 우측 사이드바 */}
          <div className="flex-none mt-16">
            <BaseSideBar />
          </div>
        </div>
      </div>
    </div>
  );
}

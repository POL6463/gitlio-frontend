import React from 'react';
import cx from 'classnames';
import TopBar from '@/app/editor/_components/TopBar';
import LeftSidebar from '@/app/editor/_components/LeftSidebar';
import BaseSideBar from '@/app/editor/_components/(rightSideBar)/BaseSideBar';

type Props = {
  children: React.ReactNode;
};

export default function EditorLayout({ children }: Props) {
  return (
    <div className="flex flex-col bg-backGray h-screen">
      <TopBar />
      <div className="flex flex-1">
        <div className="flex">
          {' '}
          {/* 왼쪽 사이드바와 메인 컨텐츠의 컨테이너 */}
          <LeftSidebar />
          <div className="flex-1 flex justify-center">
            {' '}
            {/* 메인 컨텐츠의 실제 컨테이너 */}
            <div className="w-full max-w-4xl p-4 overflow-auto">
              {children} {/* `children` 내용은 여기에 위치 */}
            </div>
          </div>
        </div>
        <div className="h-full">
          {' '}
          {/* 오른쪽 사이드바 */}
          <BaseSideBar />
        </div>
        <BaseSideBar />
      </div>
    </div>
  );
}

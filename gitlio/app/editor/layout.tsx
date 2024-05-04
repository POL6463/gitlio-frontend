import cx from 'classnames';
import TopBar from '@/app/editor/_components/TopBar';
import LeftSidebar from '@/app/editor/_components/LeftSidebar';
import BaseSideBar from '@/app/editor/_components/(rightSideBar)/BaseSideBar';
import TopIconBar from './_components/TopIconBar';

type Props = {
  children: React.ReactNode;
};

export default function EditorLayout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      {/* 전체 레이아웃을 화면 높이에 맞춤 */}
      <TopBar />
      <TopIconBar />
      <div className="flex-grow flex overflow-hidden">
        {' '}
        {/* 높이를 전체로 설정 */}
        <div className="fixed left-0 top-16 bottom-0 ">
          {' '}
          {/* 좌측 사이드바에 스크롤 적용 */}
          <LeftSidebar />
        </div>
        <div className="flex flex-col flex-grow mt-24 overflow-auto">
          {/* 메인 컨텐츠가 위치할 부분; 여기서는 불필요한 스타일 제거 및 조정 */}
          <div className="px-4 mx-auto mb-16">{children}</div>
        </div>
        <div className="fixed right-0 top-16 bottom-0">
          {' '}
          {/* 우측 사이드바에 스크롤 적용 */}
          <BaseSideBar />
        </div>
      </div>
    </div>
  );
}

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
      {' '}
      {/* 화면 전체를 채우기 위해 h-screen 추가 */}
      <TopBar />
      <div className="flex flex-1">
        {' '}
        {/* 여기에 flex-1을 추가하여 나머지 공간을 채우게 합니다 */}
        <LeftSidebar />
        <div className="flex-1 flex justify-center items-start">
          {' '}
          {/* children을 중앙에 정렬합니다 */}
          {children}
        </div>
        <BaseSideBar />
      </div>
    </div>
  );
}

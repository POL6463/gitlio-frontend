import cx from 'classnames';
import TopBar from '@/app/editor/_components/TopBar';
import LeftSidebar from '@/app/editor/_components/LeftSidebar';
import BaseSideBar from '@/app/editor/_components/(rightSideBar)/BaseSideBar';

type Props = {
  children: React.ReactNode;
};
export default function EditorLayout({ children }: Props) {
  return (
    <div className="flex flex-col">
      <TopBar />
      <div className="flex justify-between w-full bg-base-200 mt-16">
        <div className="fixed left-0 top-16 h-full">
          {' '}
          {/* LeftSidebar 고정 위치 */}
          <LeftSidebar />
        </div>
        <div className="flex-grow flex justify-center items-start overflow-auto overscroll-none">
          {/* `children` 영역에 스크롤 적용 */}
          <div className="mt-5 h-screen overflow-auto">
            {' '}
            {/* `children`의 내용을 여기에 위치, 예시로 h-screen 사용 */}
            {children}
          </div>
        </div>
        <div className="fixed right-0 top-16 h-full overflow-auto overscroll-none">
          {' '}
          {/* RightSidebar 고정 위치에 스크롤 적용 */}
          <BaseSideBar />
        </div>
      </div>
    </div>
  );
}

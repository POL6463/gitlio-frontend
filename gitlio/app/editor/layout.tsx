import cx from 'classnames';
import TopBar from '@/app/editor/_components/TopBar';
import LeftSidebar from '@/app/editor/_components/LeftSidebar';
import BaseSideBar from '@/app/editor/_components/(rightSideBar)/BaseSideBar';

type Props = {
  children: React.ReactNode;
};

export default function EditorLayout({ children }: Props) {
  return (
    <div className="flex flex-col bg-backGray min-h-dvh">
      <TopBar />
      <div className="flex flex-1">
        {' '}
        <LeftSidebar />
        <div className="flex-1 flex justify-center items-start">
          {' '}
          {children}
        </div>
        <BaseSideBar />
      </div>
    </div>
  );
}

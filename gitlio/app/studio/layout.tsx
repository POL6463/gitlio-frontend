import { ReactNode } from 'react';
import Sidebar from '@/components/studio/StdSidebar';
import StdNavbar from '@/components/studio/StdNavbar';

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <StdNavbar />
        <div>{children}</div>
      </div>
    </div>
  );
}

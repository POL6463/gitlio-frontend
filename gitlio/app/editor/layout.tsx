// EditorLayout.tsx
'use client';
import React, { useRef } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useDragDrop } from '@/hooks/useDragDrop';
import TopBar from '@/app/editor/_components/TopBar';
import LeftSidebar from '@/app/editor/_components/LeftSidebar';
import BaseSideBar from '@/app/editor/_components/(rightSideBar)/BaseSideBar';
import TopBlogBar from './_components/TopBlogBar';
import DraggableIcon from '@/app/editor/_components/(skill)/DraggableIcon';
import GlobalDragOverlay from '@/app/editor/_components/(skill)/DragOverlay';
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { getIdAfterLogin } from '@/actions/user';
import { useUserStore } from '@/store/userStore';
import ToastComponent from '@/app/editor/_components/ToastComponent';

const EditorLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { sensors, handleDragStart, handleDragEnd } = useDragDrop();
  const { isSignedIn, user } = useUser();
  const setUser = useUserStore((state) => state.setUser);
  const userId = useUserStore((state) => state.userId);
  const setUserId = useUserStore((state) => state.setUserId);
  const isRequesting = useRef(false); // 요청 중 상태 관리

  useEffect(() => {
    if (isSignedIn && user && user.id && !userId && !isRequesting.current) {
      isRequesting.current = true; // 요청 시작
      const data = {
        clerk_id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        name: user.fullName,
      };

      getIdAfterLogin(data)
        .then((fetchedUserId) => {
          if (!userId) {
            setUserId(fetchedUserId);
          }
          isRequesting.current = false; // 요청 완료
        })
        .catch((err) => {
          console.error('Failed to fetch userId:', err);
          isRequesting.current = false; // 요청 실패
        });
    }
  }, [isSignedIn, user, userId]);
  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col min-h-screen bg-base-200">
        <TopBar />
        <TopBlogBar />
        <div className="flex-grow flex overflow-hidden">
          {/*<div className="fixed left-0 top-16 bottom-0">*/}
          {/*  <LeftSidebar />*/}
          {/*</div>*/}
          <div className="flex flex-col flex-grow mt-24 overflow-auto mr-[450px] mb-16 justify-center items-center">
            <div className="px-4">{children}</div>
          </div>
          <div className="fixed right-0 top-16 bottom-0">
            <BaseSideBar />
          </div>
        </div>
        <ToastComponent />
      </div>
      <GlobalDragOverlay />
    </DndContext>
  );
};

export default EditorLayout;

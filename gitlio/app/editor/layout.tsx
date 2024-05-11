// EditorLayout.tsx
'use client';
import React from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useDragDrop } from '@/hooks/useDragDrop';
import TopBar from '@/app/editor/_components/TopBar';
import LeftSidebar from '@/app/editor/_components/LeftSidebar';
import BaseSideBar from '@/app/editor/_components/(rightSideBar)/BaseSideBar';
import TopBlogBar from './_components/TopBlogBar';
import DraggableIcon from '@/app/editor/_components/(skill)/DraggableIcon';
import GlobalDragOverlay from '@/app/editor/_components/(skill)/DragOverlay';

const EditorLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { sensors, handleDragStart, handleDragEnd } = useDragDrop();

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
          <div className="flex flex-col flex-grow mt-24 overflow-auto">
            <div className="px-4 ml-60 mb-16">{children}</div>
          </div>
          <div className="fixed right-0 top-16 bottom-0">
            <BaseSideBar />
          </div>
        </div>
      </div>
      <GlobalDragOverlay />
    </DndContext>
  );
};

export default EditorLayout;

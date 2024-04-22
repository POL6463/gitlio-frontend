import React from 'react';
import IconSelect from '@/app/editor/_components/(skill)/IconSelect';
import SelectedIcons from '@/app/editor/_components/(skill)/SelectedIcons';
import { FaRegSquarePlus, FaRegSquareMinus } from 'react-icons/fa6';
import { useSidebarIconsStore } from '@/store/sidebarIconsStore';

export default function SkillSideBar() {
  const { addDropArea, removeDropArea, setTitle, dropAreas } =
    useSidebarIconsStore();

  const handleTitleChange = (id: string, newTitle: string) => {
    setTitle(id, newTitle);
  };
  return (
    // flex 컨테이너를 사용하고, justify-content 속성으로 중앙 정렬을 적용합니다.
    <div className="flex flex-col w-full justify-center px-3">
      <div className="flex w-96 flex-row justify-start items-center mb-6">
        <div className="text-lg font-semibold">ADD SECTION</div>
        <button
          onClick={addDropArea}
          className="btn btn-sm bg-transparent border-none shadow-none ml-6"
        >
          <FaRegSquarePlus className="size-5" />
        </button>
        <button
          onClick={removeDropArea}
          className="btn btn-sm bg-transparent border-none shadow-none ml-6"
        >
          <FaRegSquareMinus className="size-5" />
        </button>
      </div>
      {dropAreas.slice(1).map((section) => (
        <div key={section.id} className="flex flex-col items-center mb-4">
          <input
            type="text"
            placeholder="Enter title..."
            value={section.title}
            onChange={(e) => handleTitleChange(section.id, e.target.value)}
            className="input input-md w-full max-w-xs bg-neutral-200 rounded-xl mb-2"
          />
        </div>
      ))}
      <div className="text-lg font-semibold mb-5">Select Skills</div>
      <div className="flex justify-center">
        <IconSelect />
      </div>
      <div className="divider my-4 w-full"></div>{' '}
      {/* 너비 조정이 필요한 경우 w-full 클래스를 추가 */}
      <div className="items-center">
        <SelectedIcons />
      </div>
    </div>
  );
}

'use client';
import { FaRegSquarePlus } from 'react-icons/fa6';
import { FaRegTrashAlt } from 'react-icons/fa';
import experienceSectionStore from '@/store/experienceSectionStore';
import ExperienceInput from '@/app/editor/_components/(rightSideBar)/ExperienceInput';

export default function ExperienceSideBar() {
  const { sections, addSection } = experienceSectionStore();
  return (
    <div className="flex flex-col w-96">
      <div className="flex w-96 flex-row justify-start items-center mb-6">
        <div className="text font-bold">CONTENT</div>
        <button
          onClick={addSection}
          className="btn btn-sm bg-transparent border-none shadow-none ml-6"
        >
          <FaRegSquarePlus className="size-5" />
        </button>
      </div>

      {sections.map((section) => (
        <ExperienceInput key={section.id} id={section.id} />
      ))}
    </div>
  );
}

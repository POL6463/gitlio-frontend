'use client';
import experienceSidebarStore from '@/store/experienceSidebarStore';
import { FaRegTrashAlt } from 'react-icons/fa';
import cx from 'classnames';

type SectionComponentProps = {
  id: string;
};

export default function ExperienceInput({ id }: SectionComponentProps) {
  const { sections, removeSection, updateSection } = experienceSidebarStore();

  const currentId = id || (sections.length > 0 ? sections[0].id : null);
  const section = sections.find((s) => s.id === currentId) || {
    title: '',
    startDate: '',
    endDate: '',
    description: '',
    ongoing: false,
  };

  const handleRemoveSection = () => {
    if (sections.length > 1 && currentId !== null) {
      // currentId가 null이 아닐 때만 실행
      removeSection(currentId);
    } else {
      // 적절한 오류 처리나 경고 메시지
      console.error('섹션을 삭제할 수 없습니다.');
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between mb-4">
        <input
          type="text"
          placeholder="타이틀"
          value={section.title}
          onChange={(e) => updateSection(id, { title: e.target.value })}
          className="input-md w-full max-w-xs mr-6 bg-neutral-200 rounded-xl"
        />
        <button
          onClick={handleRemoveSection}
          className="btn bg-transparent border-none shadow-none"
          disabled={sections.length <= 1} // 섹션이 1개 이하일 경우 버튼을 비활성화합니다.
        >
          <FaRegTrashAlt className="size-5" />
        </button>
      </div>
      <div className="flex flex-row items-center justify-between mb-4">
        <input
          type="text"
          placeholder="YY.MM"
          value={section.startDate}
          onChange={(e) => updateSection(id, { startDate: e.target.value })}
          className="input-sm w-24 mr-4 bg-neutral-200 rounded-md"
        />
        <div className="mr-4">~</div>
        <input
          type="text"
          placeholder="YY.MM"
          value={section.endDate}
          onChange={(e) => {
            // "진행중"이 아닐 때만 endDate 업데이트
            if (!section.ongoing) {
              updateSection(id, { endDate: e.target.value });
            }
          }}
          className={'input-sm w-24 mr-10 bg-neutral-200 rounded-md'}
          disabled={section.ongoing}
        />
        <div className="text mr-4">진행중</div>
        <input
          type="checkbox"
          checked={section.ongoing}
          onChange={(e) =>
            updateSection(id, { ongoing: e.target.checked, endDate: '진행중' })
          }
          className="checkbox mr-3"
        />
      </div>
      <div className="flex flex-row items-center justify-between items-stretch">
        <textarea
          value={section.description}
          onChange={(e) => updateSection(id, { description: e.target.value })}
          className="textarea w-full textarea-md bg-neutral-200 resize-none min-h-32"
          placeholder="상세 설명"
        ></textarea>
      </div>
      <div className="divider"></div>
    </div>
  );
}

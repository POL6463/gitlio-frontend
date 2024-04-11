import SkillButton from '@/app/editor/_components/(skill)/SkillButton';
import React from 'react';
import Select from 'react-select';
import IconSelect from '@/app/editor/_components/(skill)/IconSelect';
import SelectedIcons from '@/app/editor/_components/(skill)/SelectedIcons';

export default function SkillSideBar() {
  return (
    // flex 컨테이너를 사용하고, justify-content 속성으로 중앙 정렬을 적용합니다.
    <div className="flex flex-col w-full justify-center px-3">
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

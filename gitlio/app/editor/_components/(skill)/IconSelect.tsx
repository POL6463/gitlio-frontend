import { icons, IconOption } from '@/app/editor/_components/(skill)/icons';
import Select, { SingleValue, GroupBase } from 'react-select';
import React, { useState } from 'react';
import { useSidebarIconsStore, IconBlock } from '@/store/sidebarIconsStore'; // 스토어 임포트 경로는 실제 경로에 맞게 조정하세요.

// `IconOption[]` 타입으로 `iconOptions` 정의
const iconOptions: IconOption[] = Object.keys(icons).map((iconName) => ({
  value: iconName,
  label: iconName,
}));

const IconSelect = () => {
  const addIcon = useSidebarIconsStore((state) => state.addIcon);
  const [selectedValue, setSelectedValue] = useState<IconOption | null>(null); // 현재 선택된 값을 저장하는 상태

  const handleChange = (newValue: SingleValue<IconOption>) => {
    if (newValue) {
      const iconBlock: IconBlock = {
        id: Math.floor(Math.random() * 10001).toString(),
        logo: icons[newValue.value as keyof typeof icons],
        label: newValue.value,
      };
      addIcon(iconBlock); // 선택된 아이콘을 스토어에 추가합니다.
      setSelectedValue(null);
    }
  };

  return (
    <Select<IconOption, false, GroupBase<IconOption>>
      options={iconOptions}
      value={selectedValue}
      onChange={handleChange}
      getOptionLabel={(option) => option.label}
      getOptionValue={(option) => option.value}
      className="text-base w-64" // Tailwind CSS 클래스를 적용합니다.
      classNamePrefix="react-select"
      isClearable
    />
  );
};

export default IconSelect;

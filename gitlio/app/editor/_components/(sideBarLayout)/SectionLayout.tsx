import React, { useState } from 'react';
import { ChromePicker, ColorResult, TwitterPicker } from 'react-color';
import useLayoutStore from '@/store/layoutDesignStore';
import LayoutPreview from './LayoutPreview';

type SectionProps = {
  section?: string; // 기본값이 있을 수 있으므로 optional로 변경
};

const SectionLayout: React.FC<SectionProps> = ({ section = 'skill' }) => {
  const { intro, skill, experience, project, contact } = useLayoutStore();

  const [selectedColor, setSelectedColor] = useState<string>(skill.color);

  const handleOptionOne = (): void => {
    if (section === 'introduction') intro.setOption('option1');
    if (section === 'experience') experience.setOption('option1');
    if (section === 'contact') contact.setOption('option1');
    if (section === 'project') project.setOption('option1');
  };

  const handleOptionTwo = (): void => {
    if (section === 'introduction') intro.setOption('option2');
    if (section === 'experience') experience.setOption('option2');
    if (section === 'contact') contact.setOption('option2');
    if (section === 'project') project.setOption('option2');
  };

  const handleOptionThree = (): void => {
    if (section === 'introduction') intro.setOption('option3');
  };

  const handleColorChange = (color: ColorResult): void => {
    setSelectedColor(color.hex);
    skill.setColor(color.hex); // 스토어에 색상을 설정하는 함수
  };

  return (
    <div className="flex flex-col items-center w-96 h-auto">
      <h2 className="text-center font-bold">{section} Layout Options</h2>
      {['introduction', 'experience', 'skill', 'project', 'contact'].includes(
        section
      ) && (
        <div className="flex flex-wrap justify-evenly w-full mt-4">
          <div className="flex flex-col items-center">
            <LayoutPreview section={section} option="option1" />
            <button onClick={handleOptionOne} className="btn mt-4">
              Option 1
            </button>
          </div>
          <div className="flex flex-col items-center">
            <LayoutPreview section={section} option="option2" />
            <button onClick={handleOptionTwo} className="btn mt-4">
              Option 2
            </button>
          </div>
          {section === 'introduction' && (
            <div className="flex flex-wrap justify-evenly w-full mt-4">
              <div className="flex flex-col items-center mt-2">
                <LayoutPreview section={section} option="option3" />
                <button onClick={handleOptionThree} className="btn mt-4">
                  Option 3
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {section === 'skill' && (
        <div className="flex flex-col items-center mt-4">
          <TwitterPicker
            color={selectedColor}
            onChangeComplete={handleColorChange}
          />
        </div>
      )}
    </div>
  );
};

export default SectionLayout;

import useLayoutStore from '@/store/layoutDesignStore';
import React from 'react';
import LayoutPreview from './LayoutPreview';

type SectionProps = {
  section: string;
};

const SectionLayout = ({ section }: SectionProps) => {
  const { intro, skill, experience, contact } = useLayoutStore();

  const handleOptionOne = () => {
    if (section === 'introduction') intro.setOption('option1');
    if (section === 'skill') skill.setOption('option1');
    if (section === 'experience') experience.setOption('option1');
    if (section === 'contact') contact.setOption('option1');
  };

  const handleOptionTwo = () => {
    if (section === 'introduction') intro.setOption('option2');
    if (section === 'skill') skill.setOption('option2');
    if (section === 'experience') experience.setOption('option2');
    if (section === 'contact') contact.setOption('option2');
  };

  return (
    <div className="flex flex-col items-center w-96 h-auto">
      <h2 className="text-center font-bold">{section} Layout Options</h2>
      {['introduction', 'experience', 'skill', 'contact'].includes(section) && (
        <div className="flex justify-evenly w-full space-x-4 mt-4">
          <div className="flex flex-col items-center">
            <LayoutPreview section={section} option="option1" />
            <button
              onClick={handleOptionOne}
              className={`${section === 'skill' ? 'btn btn-info' : 'btn'} mt-4`}
            >
              Option 1
            </button>
          </div>
          <div className="flex flex-col items-center">
            <LayoutPreview section={section} option="option2" />
            <button
              onClick={handleOptionTwo}
              className={`${section === 'skill' ? 'btn btn-error' : 'btn'} mt-4`}
            >
              Option 2
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionLayout;

import useLayoutStore from '@/store/layoutDesignStore';
import React from 'react';
import LayoutPreview from './LayoutPreview';

type SectionProps = {
  section: string;
};

const SectionLayout = ({ section }: SectionProps) => {
  const { intro, skill, experience, contact } = useLayoutStore();

  const handleOptionOne = (): void => {
    if (section === 'introduction') intro.setOption('option1');
    if (section === 'skill') skill.setOption('option1');
    if (section === 'experience') experience.setOption('option1');
    if (section === 'contact') contact.setOption('option1');
  };

  const handleOptionTwo = (): void => {
    if (section === 'introduction') intro.setOption('option2');
    if (section === 'skill') skill.setOption('option2');
    if (section === 'experience') experience.setOption('option2');
    if (section === 'contact') contact.setOption('option2');
  };

  const handleOptionThree = (): void => {
    if (section === 'introduction') intro.setOption('option3');
  };

  return (
    <div className="flex flex-col items-center w-96 h-auto">
      <h2 className="text-center font-bold">{section} Layout Options</h2>
      {['introduction', 'experience', 'skill', 'contact'].includes(section) && (
        <div className="flex flex-wrap justify-evenly w-full mt-4">
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
          {section === 'introduction' ? (
            <div className="flex flex-wrap justify-evenly w-full mt-4">
              <div className="flex flex-col items-center mt-2">
                <LayoutPreview section={section} option="option3" />
                <button onClick={handleOptionThree} className="btn mt-4">
                  Option 3
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SectionLayout;

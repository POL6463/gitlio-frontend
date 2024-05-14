import useLayoutStore from '@/store/layoutDesignStore';
import React from 'react';

type SectionProps = {
  section: string;
};

const SectionLayout = ({ section }: SectionProps) => {
  const { intro, skill, experience, contact } = useLayoutStore();

  const handleOption1 = () => {
    if (section === 'introduction') intro.setOption('option1');
    if (section === 'skill') skill.setOption('option1');
    if (section === 'experience') experience.setOption('option1');
    if (section === 'contact') contact.setOption('option1');
  };

  const handleOption2 = () => {
    if (section === 'introduction') intro.setOption('option2');
    if (section === 'skill') skill.setOption('option2');
    if (section === 'experience') experience.setOption('option2');
    if (section === 'contact') contact.setOption('option2');
  };

  return (
    <div className="flex flex-col items-center w-96">
      <h2 className="text-center font-bold">{section} Layout Options</h2>
      {['introduction', 'experience', 'skill', 'contact'].includes(section) && (
        <div className="flex justify-evenly w-full space-x-4 mt-4">
          <button onClick={handleOption1} className="btn btn-primary">
            Option 1
          </button>
          <button onClick={handleOption2} className="btn btn-secondary">
            Option 2
          </button>
        </div>
      )}
    </div>
  );
};

export default SectionLayout;

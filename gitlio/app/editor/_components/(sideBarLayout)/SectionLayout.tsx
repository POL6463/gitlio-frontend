import useDesignStore from '@/store/layoutDesignStore';
import React from 'react';

type SectionProps = {
  section: string;
};

const SectionLayout = ({ section }: SectionProps) => {
  const { setLayoutOption } = useDesignStore();
  const handleOption1 = () => {
    setLayoutOption('option1');
  };

  const handleOption2 = () => {
    setLayoutOption('option2');
  };

  return (
    <div className="flex flex-col itesm-center w-96">
      <h2 className="text-center font-bold">{section} Layout Options</h2>
      {section === 'introduction' && (
        <div className="flex justify-evenly w-full space-x-4 mt-4">
          <button onClick={handleOption1} className="btn btn-primary">
            Option 1
          </button>
          <button onClick={handleOption2} className="btn btn-secondary">
            Option 2
          </button>
        </div>
      )}
      {/* 다른 섹션에 대한 레이아웃 옵션도 여기에 추가할 수 있습니다. */}
      {section === 'experience' && (
        <div>
          <div className="flex justify-evenly w-full space-x-4 mt-4">
            <button onClick={handleOption1} className="btn btn-primary">
              Option 1
            </button>
            <button onClick={handleOption2} className="btn btn-secondary">
              Option 2
            </button>
          </div>
        </div>
      )}
      {section === 'skill' && (
        <div className="flex justify-evenly w-full space-x-4 mt-4">
          <button onClick={handleOption1} className="btn btn-primary">
            Option 1
          </button>
          <button onClick={handleOption2} className="btn btn-secondary">
            Option 2
          </button>
        </div>
      )}
      {section === 'contact' && (
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

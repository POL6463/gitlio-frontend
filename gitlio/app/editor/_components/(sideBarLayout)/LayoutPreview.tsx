import React from 'react';

type LayoutPreviewProps = {
  section: string;
  option: 'option1' | 'option2';
};

const LayoutPreview = ({ section, option }: LayoutPreviewProps) => {
  if (section === 'introduction') {
    return (
      <div className="mt-2 w-32 h-32 flex flex-col items-center justify-center border border-gray-400">
        {option === 'option1' ? (
          <div className="flex items-start justify-between w-full p-2">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <div className="flex flex-col justify-center ml-2">
              <div className="bg-gray-300 w-16 h-4 mb-2"></div>
              <div className="bg-gray-300 w-12 h-4 mb-2"></div>
              <div className="bg-gray-300 w-20 h-4"></div>
            </div>
          </div>
        ) : (
          <div className="flex items-start justify-between w-full p-2">
            <div className="flex flex-col justify-center items-end mr-2">
              <div className="bg-gray-300 w-16 h-4 mb-2"></div>
              <div className="bg-gray-300 w-12 h-4 mb-2"></div>
              <div className="bg-gray-300 w-20 h-4"></div>
            </div>
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          </div>
        )}
      </div>
    );
  } else if (section === 'contact') {
    return (
      <div className="mt-2 w-32 h-32 flex flex-col items-center justify-center border border-gray-400">
        {option === 'option1' ? (
          <div className="flex flex-col items-center justify-center w-full p-2">
            <div className="bg-gray-300 w-6 h-6 mb-2"></div>
            <div className="bg-gray-300 w-full h-6 mt-2"></div>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full p-2">
            <div className="flex justify-center w-1/3 items-center">
              <div className="w-6 h-6 bg-gray-300"></div>
            </div>
            <div className="flex flex-col justify-between w-2/3 h-auto">
              <div className="w-full h-6 bg-gray-300 mb-2"></div>
              <div className="w-full h-6 bg-gray-300 mt-2"></div>
            </div>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export default LayoutPreview;

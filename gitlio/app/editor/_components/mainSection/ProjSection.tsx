'use client';
import React, { useEffect, useState } from 'react';
import { useProjectsStore } from '@/store/projectStore';
import ProjBox from './projComponents/ProjBox';
import { Data } from '@/app/editor/(interface)/ProjectData';
import ProjEditModal from './projComponents/ProjEditModal';

export default function ProjSection() {
  const { projects, setProjects, updateProject } = useProjectsStore();
  const [isEditProjModalOpen, setIsEditProjModalOpen] = React.useState(false);
  const [selectedRadio, setSelectedRadio] = React.useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const handleToggleModal = () => {
    setIsEditProjModalOpen(!isEditProjModalOpen);
  };

  const handleSaveData = (newData: Data[]) => {
    setProjects(newData);
    setIsEditProjModalOpen(false);
  };

  const goToNextImage = () => {
    // 다음 프로젝트를 보여줍니다. 마지막 프로젝트에서는 첫 번째 프로젝트로 돌아갑니다.
    setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const goToPreviousImage = () => {
    // 이전 프로젝트를 보여줍니다. 첫 번째 프로젝트에서는 마지막 프로젝트로 갑니다.
    setCurrentProjectIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
  };

  return (
    <div className="bg-white w-[800px] min-h-[200px] mr-32 rounded-xl flex flex-col flex-1 justify-start">
      <br />
      <div className="flex items-center -mb-3">
        <h1 className="text-3xl font-semibold ml-10 mr-5">#Project</h1>
        <div className="btn" onClick={handleToggleModal}>
          편집
        </div>
        <div className="ml-5">
          {[0, 1].map((index) => (
            <input
              key={index}
              type="radio"
              name="radio-1"
              className="radio mr-2 mt-2"
              checked={selectedRadio === index}
              onChange={() => setSelectedRadio(index)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        {selectedRadio === 0 ? (
          <div className="flex flex-col items-center">
            {projects.map((data, index) => (
              <ProjBox key={index} data={data} />
            ))}
          </div>
        ) : (
          <div className="relative">
            <ProjBox data={projects[currentProjectIndex]} />
            <button
              onClick={goToPreviousImage}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full"
            >
              &lt;
            </button>
            <button
              onClick={goToNextImage}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full"
            >
              &gt;
            </button>
          </div>
        )}
      </div>
      {isEditProjModalOpen && (
        <ProjEditModal
          onClose={() => setIsEditProjModalOpen(false)}
          data={projects}
          onSave={handleSaveData}
        />
      )}
    </div>
  );
}

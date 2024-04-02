'use client';
import React, { useEffect, useState } from 'react';
import { Data } from '@/app/editor/(interface)/ProjectData';

interface ProjEditModalProps {
    onClose: () => void;
    data: Data[];
    onSave: (newData: Data[]) => void; 
}

const ProjEditModal: React.FC<ProjEditModalProps> = ({ onClose, data, onSave }) => {
  const [projectsData, setProjectsData] = useState<Data[]>(data);

  const handleProjectChange = (index: number, field: keyof Data, value: string) => {
    const updatedProjects = projectsData.map((project, projIndex) => {
      if (index === projIndex) {
        return { ...project, [field]: value };
      }
      return project;
    });

    setProjectsData(updatedProjects);
  };

  // 특정 프로젝트의 배열 필드(images, sentences)를 업데이트하는 함수
  const handleArrayFieldChange = (projectIndex: number, field: 'images' | 'sentences', index: number, value: string) => {
    const updatedProjects = projectsData.map((project, projIndex) => {
      if (projectIndex === projIndex) {
        const newArray = [...project[field]];
        newArray[index] = value;
        return { ...project, [field]: newArray };
      }
      return project;
    });

    setProjectsData(updatedProjects);
  };

  // 특정 프로젝트의 배열 필드에 새 요소를 추가하는 함수
  const handleAddToArrayField = (projectIndex: number, field: 'images' | 'sentences') => {
    const updatedProjects = projectsData.map((project, projIndex) => {
      if (projectIndex === projIndex) {
        const newArray = [...project[field], '']; // 새로운 빈 요소 추가
        return { ...project, [field]: newArray };
      }
      return project;
    });

    setProjectsData(updatedProjects);
  };

  // 특정 프로젝트의 배열 필드에서 요소를 삭제하는 함수
  const handleRemoveFromArrayField = (projectIndex: number, field: 'images' | 'sentences', index: number) => {
    const updatedProjects = projectsData.map((project, projIndex) => {
      if (projectIndex === projIndex) {
        const newArray = [...project[field]];
        newArray.splice(index, 1); // 요소 삭제
        return { ...project, [field]: newArray };
      }
      return project;
    });

    setProjectsData(updatedProjects);
  };

    
  return (
    <dialog open className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">프로젝트 편집</h3>
        {projectsData.map((project, index) => (
          <div key={index}>
            <input
              type="text"
              className="input input-bordered w-full my-2"
              value={project.title}
              onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
              placeholder="Title"
            />
            <textarea
              className="textarea textarea-bordered w-full my-2"
              value={project.intro}
              onChange={(e) => handleProjectChange(index, 'intro', e.target.value)}
              placeholder="Intro"
            />
            <div>
              <p>Images:</p>
              {project.images.map((image, index) => (
                <div key={index}>
                  <input
                    type="text"
                    className="input input-bordered w-full my-2"
                    value={image}
                    onChange={(e) => handleArrayFieldChange(index, 'images', index, e.target.value)}
                    placeholder="Image URL"
                  />
                  <button onClick={() => handleRemoveFromArrayField(index, 'images', index)}>Remove</button>
                </div>
              ))}
              <button onClick={() => handleAddToArrayField(index, 'images')}>Add Image</button>
            </div>
            <div>
              <p>Sentences:</p>
              {project.sentences.map((sentence, index) => (
                <div key={index}>
                  <input
                    type="text"
                    className="input input-bordered w-full my-2"
                    value={sentence}
                    onChange={(e) => handleArrayFieldChange(index, 'sentences', index, e.target.value)}
                    placeholder="Sentence"
                  />
                  <button onClick={() => handleRemoveFromArrayField(index, 'sentences', index)}>Remove</button>
                </div>
              ))}
              <button onClick={() => handleAddToArrayField(index, 'sentences')}>Add Sentence</button>
            </div>
          </div>
        ))}
        <div>
        
        
        <div className="modal-action">
          <button className="btn" onClick={() => onSave(projectsData)}>저장</button>
        </div>
        </div>
      </div>
    </dialog>
  )
}

export default ProjEditModal
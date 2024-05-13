'use client';
import React, { useState, useEffect } from 'react';
import { useProjectsStore } from '@/store/projectStore';
import EditModalSidebar from './EditModalSidebar';
import ProjectEditForm from './projectForm/ProjectEditForm';
import ProjectAddForm from './projectForm/ProjectAddForm';
import GptAddModal from './GptAddModal';
import { Data } from '@/app/editor/(interface)/ProjectData';

interface ProjEditModalProps {
  onClose: () => void;
  data: Data[];
  onSave: (newData: Data[]) => void;
  isAddingNewProject?: boolean;
}

const ProjEditModal: React.FC<ProjEditModalProps> = ({
  onClose,
  data,
  onSave,
  isAddingNewProject = false,
}) => {
  const { projects, setProjects } = useProjectsStore();
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<Data | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [projectCreationType, setProjectCreationType] = useState<string>('');

  const sidebarData = data.map((d) => ({
    url: d.url || '', // undefined일 경우 기본값 설정
    title: d.title,
  }));

  useEffect(() => {
    if (!isAddingNewProject) {
      const project = projects.find((p) => p.url === selectedUrl);
      setEditedData(project ?? null);
    }
  }, [selectedUrl, projects, isAddingNewProject]);

  const handleSave = () => {
    if (editedData) {
      const updatedData = [...projects]; // 현재 프로젝트 리스트를 복사
      const index = updatedData.findIndex((p) => p.url === editedData.url);
      if (index !== -1) {
        updatedData[index] = { ...updatedData[index], ...editedData };
      } else {
        updatedData.push(editedData); // 새 프로젝트 추가
      }
      onSave(updatedData); // 업데이트된 데이터 전달
      onClose();
    }
  };

  const handleDeleteSentence = (index: number) => {
    if (editedData && editedData.sentences) {
      const newSentences = [...editedData.sentences];
      newSentences.splice(index, 1);
      setEditedData({ ...editedData, sentences: newSentences });
    }
  };

  const handleImageSelect = (selectedImagesForUrl: {
    [url: string]: string[];
  }) => {
    if (selectedUrl && editedData) {
      const updatedImages = selectedImagesForUrl[selectedUrl] || [];
      handleChange('images', updatedImages);
    }
    setModalIsOpen(false);
  };

  const handleChange = (field: keyof Data, value: any, index?: number) => {
    if (field === 'sentences' && editedData && typeof index === 'number') {
      const newSentences = [...editedData.sentences];
      newSentences[index] = value;
      setEditedData({ ...editedData, [field]: newSentences });
    } else if (editedData) {
      setEditedData({ ...editedData, [field]: value });
    }
  };

  return (
    <dialog open className="modal">
      <div className="modal-box max-w-none w-4/5">
        <form method="dialog">
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <div className="flex">
          <EditModalSidebar
            data={sidebarData}
            onSelectUrl={setSelectedUrl}
            savedUrls={data.reduce(
              (acc, curr) => ({ ...acc, [curr.url as string]: true }),
              {}
            )}
            setProjectCreationType={setProjectCreationType}
          />
          {projectCreationType === 'manual' ? (
            <ProjectAddForm
              onAdd={(newProject) => {
                projects.push({ ...newProject, url: newProject.url || '' });
                onSave([...projects]);
              }}
              onClose={onClose}
            />
          ) : projectCreationType === 'gpt' ? (
            <GptAddModal
              isOpen={projectCreationType === 'gpt'}
              onClose={() => setProjectCreationType('')}
            />
          ) : (
            <ProjectEditForm
              editedData={editedData}
              onChange={handleChange}
              onSave={handleSave}
              onClose={onClose}
              handleDeleteSentence={handleDeleteSentence}
              handleImageSelect={handleImageSelect}
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
              selectedUrl={selectedUrl}
            />
          )}
        </div>
      </div>
    </dialog>
  );
};

export default ProjEditModal;

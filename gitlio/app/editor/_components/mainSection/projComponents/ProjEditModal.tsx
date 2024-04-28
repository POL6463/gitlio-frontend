'use client';
import React, { useState, useEffect } from 'react';
import { useProjectsStore } from '@/store/projectStore';
import EditModalSidebar from './EditModalSidebar';
import ImgSelectModal from './ImgSelectModal';
import ProjectEditForm from './projectForm/ProjectEditForm';
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
  const { projects, updateProject } = useProjectsStore();
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<Data | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

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
      const updatedData = { ...editedData, url: editedData.url || '' };
      if (isAddingNewProject) {
        projects.push(updatedData); // 새 프로젝트를 배열에 추가
      } else {
        updateProject(updatedData);
      }
      onSave([...projects]);
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
          />
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
        </div>
      </div>
    </dialog>
  );
};

export default ProjEditModal;

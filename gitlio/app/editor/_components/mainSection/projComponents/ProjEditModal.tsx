'use client';
import React, { useState, useEffect } from 'react';
import { useProjectsStore } from '@/store/projectStore';
import EditModalSidebar from './EditModalSidebar';
import ImgSelectModal from './ImgSelectModal';
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
          {editedData && (
            <div className="flex-grow p-4">
              <h3 className="font-bold text-lg mb-4">
                {isAddingNewProject
                  ? '새 프로젝트 추가'
                  : `프로젝트 편집: ${editedData.title}`}
              </h3>
              <label className="block mb-1 text-gray-600 text-sm">
                프로젝트 제목:
              </label>
              <input
                type="text"
                value={editedData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="input input-bordered w-full mb-4"
                placeholder="Title"
              />
              <label className="block mb-1 text-gray-600 text-sm">
                프로젝트 소개:
              </label>
              <textarea
                value={editedData.intro}
                onChange={(e) => handleChange('intro', e.target.value)}
                className="textarea textarea-bordered w-full mb-4"
                placeholder="Intro"
              />
              <label className="block mb-1 text-gray-600 text-sm">
                깃허브 URL:
              </label>
              <input
                type="text"
                value={editedData.url ?? ''}
                onChange={(e) => handleChange('url', e.target.value)}
                className="input input-bordered w-full mb-4"
                placeholder="URL (optional)"
              />
              <label className="block mb-1 text-gray-600 text-sm">
                서비스 URL:
              </label>
              <input
                type="text"
                value={editedData.serviceUrl ?? ''}
                onChange={(e) => handleChange('serviceUrl', e.target.value)}
                className="input input-bordered w-full mb-4"
                placeholder="Service URL (optional)"
              />
              <div className="btn mb-3" onClick={() => setModalIsOpen(true)}>
                이미지 편집
              </div>
              <ImgSelectModal
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                onSelect={handleImageSelect}
                images={{
                  [selectedUrl || '']: editedData ? editedData.images : [],
                }}
                currentUrl={selectedUrl || ''}
              />
              <div
                className="overflow-x-auto mb-4"
                style={{ maxWidth: '100%' }}
              >
                <div className="flex space-x-2">
                  {editedData.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Project Image ${index}`}
                      className="object-contain w-auto h-40"
                    />
                  ))}
                </div>
              </div>
              <label className="block mb-1 text-gray-600 text-sm">
                주요 개발 내용:
              </label>
              {editedData.sentences.map((sentence, index) => (
                <div key={index} className="mb-2 flex items-center">
                  <input
                    type="text"
                    value={sentence}
                    onChange={(e) =>
                      handleChange('sentences', e.target.value, index)
                    }
                    className="input input-bordered w-full mb-2 mr-2"
                    placeholder="Sentence"
                  />
                  <button
                    onClick={() => handleDeleteSentence(index)}
                    className="btn btn-error btn-xs mb-2"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  handleChange('sentences', [...editedData.sentences, ''])
                }
                className="btn btn-info "
              >
                문장 추가
              </button>
              <div className="modal-action">
                <button onClick={handleSave} className="btn">
                  저장
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default ProjEditModal;

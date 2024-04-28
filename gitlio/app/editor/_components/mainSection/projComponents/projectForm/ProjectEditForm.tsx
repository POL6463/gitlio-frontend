// ProjectEditForm.tsx
import React from 'react';
import { Data } from '@/app/editor/(interface)/ProjectData';
import ImgSelectModal from '../ImgSelectModal';

interface ProjectEditFormProps {
  editedData: Data | null;
  onChange: (field: keyof Data, value: any, index?: number) => void;
  onSave: () => void;
  onClose: () => void;
  handleDeleteSentence: (index: number) => void;
  handleImageSelect: (selectedImagesForUrl: {
    [url: string]: string[];
  }) => void;
  modalIsOpen: boolean;
  setModalIsOpen: (isOpen: boolean) => void;
  selectedUrl: string | null;
}

const ProjectEditForm: React.FC<ProjectEditFormProps> = ({
  editedData,
  onChange,
  onSave,
  onClose,
  handleDeleteSentence,
  handleImageSelect,
  modalIsOpen,
  setModalIsOpen,
  selectedUrl,
}) => {
  if (!editedData) return null;

  return (
    <>
      {editedData && (
        <div className="flex-grow p-4">
          <h3 className="font-bold text-lg mb-4">
            프로젝트 편집: {editedData.title}
          </h3>
          <label className="block mb-1 text-gray-600 text-sm">
            프로젝트 제목:
          </label>
          <input
            type="text"
            value={editedData.title}
            onChange={(e) => onChange('title', e.target.value)}
            className="input input-bordered w-full mb-4"
            placeholder="Title"
          />
          <label className="block mb-1 text-gray-600 text-sm">
            프로젝트 소개:
          </label>
          <textarea
            value={editedData.intro}
            onChange={(e) => onChange('intro', e.target.value)}
            className="textarea textarea-bordered w-full mb-4"
            placeholder="Intro"
          />
          <label className="block mb-1 text-gray-600 text-sm">
            깃허브 URL:
          </label>
          <input
            type="text"
            value={editedData.url ?? ''}
            onChange={(e) => onChange('url', e.target.value)}
            className="input input-bordered w-full mb-4"
            placeholder="URL (optional)"
          />
          <label className="block mb-1 text-gray-600 text-sm">
            서비스 URL:
          </label>
          <input
            type="text"
            value={editedData.serviceUrl ?? ''}
            onChange={(e) => onChange('serviceUrl', e.target.value)}
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
          <div className="overflow-x-auto mb-4" style={{ maxWidth: '100%' }}>
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
                onChange={(e) => onChange('sentences', e.target.value, index)}
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
            onClick={() => onChange('sentences', [...editedData.sentences, ''])}
            className="btn btn-info "
          >
            문장 추가
          </button>
          <div className="modal-action">
            <button onClick={onSave} className="btn">
              저장
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectEditForm;

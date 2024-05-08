// ProjectAddForm.tsx
import React from 'react';
import ImgSelectModal from '../ImgSelectModal';
import { Data } from '@/app/editor/(interface)/ProjectData';

interface ProjectAddFormProps {
  onAdd: (newProject: Data) => void;
  onClose: () => void;
}

const ProjectAddForm: React.FC<ProjectAddFormProps> = ({ onAdd, onClose }) => {
  const [newProject, setNewProject] = React.useState<Data>({
    title: '',
    intro: '',
    url: '',
    serviceUrl: '',
    images: [],
    sentences: [],
  });
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);

  const handleChange = (field: keyof Data, value: any) => {
    setNewProject((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    onAdd(newProject);
    onClose();
  };

  const handleImageSelect = (selectedImagesForUrl: {
    [url: string]: string[];
  }) => {
    setNewProject((prev) => ({
      ...prev,
      images: selectedImagesForUrl[newProject.url || ''] || [],
    }));
    setModalIsOpen(false);
  };

  return (
    <div className="flex-grow p-4">
      <h3 className="font-bold text-lg mb-4">새 프로젝트 추가</h3>
      <label className="block mb-1 text-gray-600 text-sm">프로젝트 제목:</label>
      <input
        type="text"
        value={newProject.title}
        onChange={(e) => handleChange('title', e.target.value)}
        className="input input-bordered w-full mb-4"
        placeholder="Title"
      />
      <label className="block mb-1 text-gray-600 text-sm">프로젝트 소개:</label>
      <textarea
        value={newProject.intro}
        onChange={(e) => handleChange('intro', e.target.value)}
        className="textarea textarea-bordered w-full mb-4"
        placeholder="Intro"
      />
      <label className="block mb-1 text-gray-600 text-sm">깃허브 URL:</label>
      <input
        type="text"
        value={newProject.url}
        onChange={(e) => handleChange('url', e.target.value)}
        className="input input-bordered w-full mb-4"
        placeholder="GitHub URL (optional)"
      />
      <label className="block mb-1 text-gray-600 text-sm">서비스 URL:</label>
      <input
        type="text"
        value={newProject.serviceUrl}
        onChange={(e) => handleChange('serviceUrl', e.target.value)}
        className="input input-bordered w-full mb-4"
        placeholder="Service URL (optional)"
      />

      <div className="btn mb-3" onClick={() => setModalIsOpen(true)}>
        이미지 추가
      </div>
      <ImgSelectModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onSelect={handleImageSelect}
        images={{ [newProject.url || '']: newProject.images }}
        currentUrl={newProject.url || ''}
      />
      <div className="overflow-x-auto mb-4" style={{ maxWidth: '100%' }}>
        <div className="flex space-x-2">
          {newProject.images.map((image, index) => (
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
      {newProject.sentences.map((sentence, index) => (
        <div key={index} className="mb-2 flex items-center">
          <input
            type="text"
            value={sentence}
            onChange={(e) =>
              handleChange('sentences', [
                ...newProject.sentences.slice(0, index),
                e.target.value,
                ...newProject.sentences.slice(index + 1),
              ])
            }
            className="input input-bordered w-full mb-2 mr-2"
            placeholder="Sentence"
          />
          <button
            onClick={() =>
              handleChange(
                'sentences',
                newProject.sentences.filter((_, idx) => idx !== index)
              )
            }
            className="btn btn-error btn-xs mb-2"
          >
            X
          </button>
        </div>
      ))}
      <button
        onClick={() => handleChange('sentences', [...newProject.sentences, ''])}
        className="btn btn-info "
      >
        문장 추가
      </button>

      <div className="modal-action">
        <button onClick={handleAdd} className="btn btn-primary">
          생성
        </button>
      </div>
    </div>
  );
};

export default ProjectAddForm;

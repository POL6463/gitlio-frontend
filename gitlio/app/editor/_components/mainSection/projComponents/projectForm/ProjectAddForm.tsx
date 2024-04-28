// ProjectAddForm.tsx
import React from 'react';
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

  const handleChange = (field: keyof Data, value: any) => {
    setNewProject((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    onAdd(newProject);
    onClose();
  };

  return (
    <div className="flex-grow p-4">
      <h3 className="font-bold text-lg mb-4">새 프로젝트 추가</h3>
      <input
        type="text"
        value={newProject.title}
        onChange={(e) => handleChange('title', e.target.value)}
        className="input input-bordered w-full mb-4"
        placeholder="Title"
      />
      <textarea
        value={newProject.intro}
        onChange={(e) => handleChange('intro', e.target.value)}
        className="textarea textarea-bordered w-full mb-4"
        placeholder="Intro"
      />
      <input
        type="text"
        value={newProject.url}
        onChange={(e) => handleChange('url', e.target.value)}
        className="input input-bordered w-full mb-4"
        placeholder="GitHub URL (optional)"
      />
      <input
        type="text"
        value={newProject.serviceUrl}
        onChange={(e) => handleChange('serviceUrl', e.target.value)}
        className="input input-bordered w-full mb-4"
        placeholder="Service URL (optional)"
      />
      <div className="modal-action">
        <button onClick={handleAdd} className="btn btn-primary">
          추가
        </button>
      </div>
    </div>
  );
};

export default ProjectAddForm;

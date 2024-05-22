// 'use client';
import React, { useState, useEffect } from 'react';
import { CreateGPTProject } from '@/actions/creategpt';
import { useProjectsStore } from '@/store/projectStore';
import { useUserStore } from '@/store/userStore';
import LoadingModal from './LoadingModal';

interface GptAddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GptAddModal: React.FC<GptAddModalProps> = ({ isOpen, onClose }) => {
  const [githubId, setGithubId] = useState<string>('');
  const [repoUrl, setRepoUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to handle loading
  const projects = useProjectsStore((state) => state.projects);
  const setProjects = useProjectsStore((state) => state.setProjects);
  const userId = useUserStore((state) => state.userId);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (userId === null) {
      return;
    }
    e.preventDefault();
    setIsLoading(true);
    try {
      const newProject = await CreateGPTProject({
        githubId,
        repoUrl,
        userId: userId,
      });
      setProjects([...projects, newProject]); // Add new project to the state
      console.log('Project created:', newProject);
    } catch (error) {
      console.error('Failed to create project:', error);
      alert('프로젝트 생성에 실패했습니다.');
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
      onClose(); // Optionally close the modal here
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">GPT 프로젝트 생성</h2>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              GitHub ID:
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="GitHub ID"
              value={githubId}
              onChange={(e) => setGithubId(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              GitHub Repository URL:
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="GitHub Repository URL"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            생성
          </button>
        </form>
        {isLoading && <LoadingModal />}
      </div>
    </div>
  );
};

export default GptAddModal;

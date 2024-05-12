'use client';
import React, { useState } from 'react';
import axios from 'axios';

interface GptAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGptResponse: (data: any) => void;
}

const GptAddModal: React.FC<GptAddModalProps> = ({
  isOpen,
  onClose,
  onGptResponse,
}) => {
  const [githubId, setGithubId] = useState<string>('');
  const [repoUrl, setRepoUrl] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const requestBody = {
      user_id: 0, // 이 값은 상황에 따라 변경할 수 있습니다.
      github_username: githubId,
      repository_url: [repoUrl], // 배열 형태로 전달
    };
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
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
            제출
          </button>
        </form>
      </div>
    </div>
  );
};

export default GptAddModal;

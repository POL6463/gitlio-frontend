'use client';
import React, { useState } from 'react';
import { CreateProjectServer } from '@/api/GptCreateProject';

interface GptAddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GptAddModal: React.FC<GptAddModalProps> = ({ isOpen, onClose }) => {
  const [githubId, setGithubId] = useState<string>('');
  const [repoUrl, setRepoUrl] = useState<string>('');
  const [submitTrigger, setSubmitTrigger] = useState<number>(0); // API 요청을 트리거하기 위한 상태

  if (!isOpen) return null;

  const handleSuccess = (data: any) => {
    console.log('API 성공:', data);
    onClose(); // 성공 후 모달 닫기
  };

  const handleError = (error: any) => {
    console.error('API 실패:', error);
    alert('프로젝트 생성에 실패했습니다.');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitTrigger(Date.now()); // 현재 시각을 기준으로 상태 업데이트하여 API 호출 트리거
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
        {/* 서버 컴포넌트 호출 부분 */}
        {submitTrigger > 0 && (
          <CreateProjectServer
            githubId={githubId}
            repoUrl={repoUrl}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        )}
      </div>
    </div>
  );
};

export default GptAddModal;

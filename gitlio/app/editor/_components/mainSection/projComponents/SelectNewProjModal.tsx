'use client';
import React, { useState } from 'react';

interface ProjectAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (type: 'gpt' | 'manual') => void;
}

const SelectNewProjModal: React.FC<ProjectAddModalProps> = ({
  isOpen,
  onClose,
  onAddProject,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-lg font-bold mr-12">프로젝트 생성 방법 선택</h2>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost  "
          >
            ×
          </button>
        </div>

        <div className="flex flex-row items-center">
          <button
            className="btn mr-4"
            onClick={() => {
              onAddProject('gpt');
              onClose();
            }}
          >
            GPT를 사용한 생성
          </button>
          <button
            className="btn "
            onClick={() => {
              onAddProject('manual');
              onClose();
            }}
          >
            수동 생성
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectNewProjModal;

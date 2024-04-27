'use client';
import React, { useState, useEffect } from 'react';
import SelectNewProjModal from './SelectNewProjModal';

interface EditModalSidebarProps {
  data: { url: string; title: string }[];
  onSelectUrl: (url: string) => void;
  savedUrls: { [url: string]: boolean };
}

const EditModalSidebar: React.FC<EditModalSidebarProps> = ({
  onSelectUrl,
  savedUrls,
}) => {
  const [repositoryUrls, setRepositoryUrls] = useState<string[]>([]);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    // savedUrls 객체의 키를 사용하여 URL 목록을 생성합니다.
    const urls = Object.keys(savedUrls);
    setRepositoryUrls(urls);
  }, [savedUrls]); // savedUrls가 변경될 때마다 실행

  const handleSelectUrl = (url: string) => {
    onSelectUrl(url);
    setSelectedUrl(url); // 선택된 URL 상태 업데이트
  };

  const handleAddProject = (type: 'gpt' | 'manual') => {
    console.log(`Project type selected: ${type}`);
    // Here you would handle the actual project addition logic
  };

  return (
    <div className="flex sidebar h-full w-72 border-r-gray-200 flex-col">
      {repositoryUrls.map((url: string, index) => {
        const displayUrl = url.replace('https://github.com/', ''); // 화면에 표시할 URL
        return (
          <button
            key={index}
            className={`btn btn-wide my-2 mx-4 gap-2 ${
              selectedUrl === url ? 'bg-selected text-black' : 'btn-ghost'
            }`} // 조건부 스타일링 적용
            onClick={() => handleSelectUrl(url)}
          >
            {displayUrl}
          </button>
        );
      })}
      <button
        className="btn my-2 mx-4 gap-2 justify-center"
        onClick={() => setIsAddModalOpen(true)}
      >
        프로젝트 추가
      </button>
      <SelectNewProjModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProject={handleAddProject}
      />
    </div>
  );
};

export default EditModalSidebar;

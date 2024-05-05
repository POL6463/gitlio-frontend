'use client';
import React, { useState, useEffect } from 'react';
import SelectNewProjModal from './SelectNewProjModal';

interface EditModalSidebarProps {
  data: { url: string; title: string }[];
  onSelectUrl: (url: string) => void;
  savedUrls: { [url: string]: boolean };
  setProjectCreationType: (type: string) => void;
}

const EditModalSidebar: React.FC<EditModalSidebarProps> = ({
  data,
  onSelectUrl,
  savedUrls,
  setProjectCreationType,
}) => {
  const [repositoryTitles, setRepositoryTitles] = useState<
    { url: string; title: string }[]
  >([]);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    // savedUrls 객체의 키를 사용하여 URL 목록을 생성합니다.
    const titles = Object.keys(savedUrls).map((url) => ({
      url: url,
      title:
        data.find((d) => d.url === url)?.title ||
        url.replace('https://github.com/', ''), // URL이 일치하지 않는 경우 URL에서 제목을 추출
    }));
    setRepositoryTitles(titles);
  }, [savedUrls, data]); // savedUrls가 변경될 때마다 실행

  const handleSelectUrl = (url: string) => {
    onSelectUrl(url);
    setSelectedUrl(url); // 선택된 URL 상태 업데이트
  };

  return (
    <div className="flex sidebar h-full w-72 border-r-gray-200 flex-col">
      {repositoryTitles.map(({ url, title }, index) => (
        <button
          key={index}
          className={`btn btn-wide my-2 mx-4 gap-2 ${
            selectedUrl === url ? 'bg-selected text-black' : 'btn-ghost'
          }`} // 조건부 스타일링 적용
          onClick={() => handleSelectUrl(url)}
        >
          {title}
        </button>
      ))}
      <button
        className="btn my-2 mx-4 gap-2 justify-center"
        onClick={() => setIsAddModalOpen(true)}
      >
        프로젝트 추가
      </button>
      <SelectNewProjModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProject={setProjectCreationType}
      />
    </div>
  );
};

export default EditModalSidebar;

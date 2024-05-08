'use client';
import React, { useState, useEffect } from 'react';
import SelectNewProjModal from './SelectNewProjModal';
import { useProjectsStore } from '@/store/projectStore';

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
  const { deleteProject } = useProjectsStore();
  const [repositoryTitles, setRepositoryTitles] = useState<
    { url: string; title: string }[]
  >([]);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [creationType, setCreationType] = useState<string | null>(null); // 내부 상태로 생성 타입 관리

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

  useEffect(() => {
    setProjectCreationType(creationType ?? ''); // 외부 prop 업데이트를 유지
  }, [creationType, setProjectCreationType]);

  const handleDelete = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteProject(url);
  };

  const handleSelectUrl = (url: string) => {
    onSelectUrl(url);
    setSelectedUrl(url); // 선택된 URL 상태 업데이트
  };

  return (
    <div className="flex sidebar h-full w-72 border-r-gray-200 flex-col">
      {repositoryTitles.map(({ url, title }, index) => (
        <div
          key={index}
          className="flex justify-between items-center my-2 mx-4"
        >
          <button
            className={`btn btn-wide gap-2 ${selectedUrl === url ? 'bg-selected text-black' : 'btn-ghost'} ${creationType === 'manual' ? 'disabled:opacity-50 disabled:bg-gray-100 disabled:text-gray-600' : ''}`}
            onClick={() => handleSelectUrl(url)}
            disabled={creationType === 'manual'}
          >
            {title}
          </button>
          <button
            className="btn btn-ghost btn-circle btn-xs"
            onClick={(e) => handleDelete(url, e)}
          >
            ✕
          </button>
        </div>
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
        onAddProject={(type) => {
          setCreationType(type); // 이 부분에서 내부 상태 setCreationType을 사용해야 합니다.
          setIsAddModalOpen(false);
        }}
      />
    </div>
  );
};
export default EditModalSidebar;

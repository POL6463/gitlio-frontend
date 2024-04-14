'use client';
import React, { useState, useEffect } from 'react';
import { useProjectsStore } from '@/store/projectStore';
import EditModalSidebar from './EditModalSidebar';
import ImgSelectModal from './ImgSelectModal';
import { Data } from '@/app/editor/(interface)/ProjectData';
interface ProjEditModalProps {
  onClose: () => void;
  data: Data[];
  onSave: (newData: Data[]) => void;
}

const ProjEditModal: React.FC<ProjEditModalProps> = ({
  onClose,
  data,
  onSave,
}) => {
  const { projects, updateProject } = useProjectsStore();
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<Data | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const sidebarData = data.map((d) => ({
    url: d.url || '기본값', // undefined일 경우 기본값 설정
    title: d.title,
  }));

  // 선택된 프로젝트 데이터를 찾아서 editedData 상태를 설정합니다.
  useEffect(() => {
    const project = projects.find((p) => p.url === selectedUrl);
    setEditedData(project ?? null);
  }, [selectedUrl, projects]);

  // 편집된 데이터를 onSave 함수를 통해 저장합니다.
  const handleSave = () => {
    if (editedData) {
      const updatedData = { ...editedData, url: editedData.url || '' };
      updateProject(updatedData);
      onSave([...projects]);
      onClose();
    }
  };

  const handleDeleteSentence = (index: number) => {
    if (editedData && editedData.sentences) {
      const newSentences = [...editedData.sentences];
      newSentences.splice(index, 1);
      setEditedData({ ...editedData, sentences: newSentences });
    }
  };

  const handleImageSelect = (selectedImagesForUrl: {
    [url: string]: string[];
  }) => {
    // 이미지 선택 로직 처리
    if (selectedUrl && editedData) {
      // 선택된 URL의 이미지를 업데이트합니다.
      const updatedImages = selectedImagesForUrl[selectedUrl] || [];
      handleChange('images', updatedImages);
    }
    setModalIsOpen(false);
  };

  // editedData 상태를 업데이트합니다.
  const handleChange = (field: keyof Data, value: any, index?: number) => {
    if (field === 'sentences' && editedData && typeof index === 'number') {
      const newSentences = [...editedData.sentences];
      newSentences[index] = value;
      setEditedData({ ...editedData, [field]: newSentences });
    } else if (editedData) {
      setEditedData({ ...editedData, [field]: value });
    }
  };

  return (
    <dialog open className="modal">
      <div className="modal-box max-w-none w-4/5">
        <form method="dialog">
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <div className="flex">
          <EditModalSidebar
            data={sidebarData}
            onSelectUrl={setSelectedUrl}
            savedUrls={data.reduce(
              (acc, curr) => ({ ...acc, [curr.url as string]: true }),
              {}
            )}
          />
          {editedData && (
            <div className="flex-grow p-4">
              <h3 className="font-bold text-lg mb-4">
                프로젝트 편집: {editedData.title}
              </h3>
              <input
                type="text"
                value={editedData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="input input-bordered w-full mb-4"
                placeholder="Title"
              />
              <textarea
                value={editedData.intro}
                onChange={(e) => handleChange('intro', e.target.value)}
                className="textarea textarea-bordered w-full mb-4"
                placeholder="Intro"
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

              <div
                className="overflow-x-auto mb-4"
                style={{ maxWidth: '100%' }}
              >
                <div className="flex space-x-2">
                  {editedData.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Project Image ${index}`}
                      className="object-contain w-auto h-40" // 이미지 크기 조정
                    />
                  ))}
                </div>
              </div>
              {editedData.sentences.map((sentence, index) => (
                <div key={index} className="mb-4 flex items-center">
                  <input
                    type="text"
                    value={sentence}
                    onChange={(e) =>
                      handleChange('sentences', e.target.value, index)
                    }
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
                onClick={() =>
                  handleChange('sentences', [...editedData.sentences, ''])
                }
                className="btn btn-info mb-4"
              >
                문장 추가
              </button>
              <div className="modal-action">
                <button onClick={handleSave} className="btn">
                  저장
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default ProjEditModal;

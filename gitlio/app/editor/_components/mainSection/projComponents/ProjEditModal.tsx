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

  // 선택된 프로젝트 데이터를 찾아서 editedData 상태를 설정합니다.
  useEffect(() => {
    const project = data.find((project) => project.url === selectedUrl);
    setEditedData(project ?? null);
  }, [selectedUrl, data]);

  // 편집된 데이터를 onSave 함수를 통해 저장합니다.
  const handleSave = () => {
    if (!editedData) return;
    updateProject(editedData);
    onClose();
  };

  // editedData 상태를 업데이트합니다.
  const handleChange = <T extends keyof Data>(field: T, value: Data[T]) => {
    setEditedData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleImageSelect = (selectedImages: string[]) => {
    if (editedData) {
      handleChange('images', selectedImages);
    }
    setModalIsOpen(false); // 이미지 선택 모달 닫기
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
            data={data.map((d) => ({ url: d.url, title: d.title }))}
            onSelectUrl={setSelectedUrl}
            savedUrls={data.reduce(
              (acc, curr) => ({ ...acc, [curr.url]: true }),
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
                onSelect={(selectedImages) => {
                  // editedData 업데이트 로직 추가 예정
                  handleChange('images', selectedImages); // 선택된 이미지 배열로 editedData의 images 필드 업데이트
                  setModalIsOpen(false); // 이미지 선택 모달 닫기
                }}
                images={editedData ? editedData.images : []} // 현재 편집 중인 프로젝트의 이미지만 전달
              />
              {editedData.images.map((image, index) => (
                <div key={index} className="mb-4">
                  <img
                    src={image}
                    alt={`Project Image ${index}`}
                    className="w-full max-h-40 object-cover"
                    style={{
                      maxWidth: '300px',
                      maxHeight: '200px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              ))}
              <button
                onClick={() =>
                  handleChange('images', [...editedData.images, ''])
                }
                className="btn btn-primary mb-4"
              >
                Add Image
              </button>
              {editedData.sentences.map((sentence, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="text"
                    value={sentence}
                    onChange={(e) => {
                      const newSentences = [...editedData.sentences];
                      newSentences[index] = e.target.value;
                      handleChange('sentences', newSentences);
                    }}
                    className="input input-bordered w-full mb-2"
                    placeholder="Sentence"
                  />
                </div>
              ))}
              <button
                onClick={() =>
                  handleChange('sentences', [...editedData.sentences, ''])
                }
                className="btn btn-primary mb-4"
              >
                Add Sentence
              </button>
              <div className="modal-action">
                <button onClick={handleSave} className="btn">
                  Save Changes
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

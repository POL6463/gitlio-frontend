'use client';
import React, { useState, useEffect } from 'react';
import EditModalSidebar from './EditModalSidebar'; // 경로는 실제 위치에 맞게 조정하세요.

interface Data {
  url: string;
  title: string;
  intro: string;
  images: string[];
  sentences: string[];
}

interface ProjEditModalProps {
  onClose: () => void;
  data: Data[];
  onSave: (newData: Data[]) => void;
}

const ProjEditModal: React.FC<ProjEditModalProps> = ({ onClose, data, onSave }) => {
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<Data | null>(null);

  // 선택된 프로젝트 데이터를 찾아서 editedData 상태를 설정합니다.
  useEffect(() => {
    const project = data.find(project => project.url === selectedUrl);
    setEditedData(project ?? null);
  }, [selectedUrl, data]);

  // 편집된 데이터를 onSave 함수를 통해 저장합니다.
  const handleSave = () => {
    if (!editedData) return;
    onSave(data.map(project => project.url === editedData.url ? editedData : project));
    onClose(); // 저장 후 모달 닫기
  };

  // editedData 상태를 업데이트합니다.
  const handleChange = <T extends keyof Data>(field: T, value: Data[T]) => {
    setEditedData(prev => prev ? { ...prev, [field]: value } : null);
  };

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div className="flex">
          <EditModalSidebar
            data={data.map(d => ({ url: d.url, title: d.title }))}
            onSelectUrl={setSelectedUrl}
            savedUrls={data.reduce((acc, curr) => ({ ...acc, [curr.url]: true }), {})}
          />
          {editedData && (
            <div className="flex-grow p-4">
              <h3 className="font-bold text-lg mb-4">프로젝트 편집: {editedData.title}</h3>
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
              {editedData.images.map((image, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => {
                      const newImages = [...editedData.images];
                      newImages[index] = e.target.value;
                      handleChange('images', newImages);
                    }}
                    className="input input-bordered w-full mb-2"
                    placeholder="Image URL"
                  />
                </div>
              ))}
              <button onClick={() => handleChange('images', [...editedData.images, ''])} className="btn btn-primary mb-4">Add Image</button>
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
              <button onClick={() => handleChange('sentences', [...editedData.sentences, ''])} className="btn btn-primary mb-4">Add Sentence</button>
              <div className="modal-action">
                <button onClick={handleSave} className="btn">Save Changes</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default ProjEditModal;

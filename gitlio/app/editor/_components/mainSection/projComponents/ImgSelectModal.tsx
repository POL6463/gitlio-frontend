'use client';
import React, { useState } from 'react';

interface ImageSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (images: string[]) => void; // 이미지들을 선택하는 함수
  images: string[];
  currentUrl: string; // 현재 편집 중인 URL 추가
}

const ImgSelectModal: React.FC<ImageSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  images,
  currentUrl,
}) => {
  const [selectedImagesByURL, setSelectedImagesByURL] = useState<{
    [url: string]: string[];
  }>({});

  // 이미지 선택/해제 토글 로직
  const toggleImageSelection = (image: string) => {
    const selectedImages = selectedImagesByURL[currentUrl] || [];
    if (selectedImages.includes(image)) {
      setSelectedImagesByURL({
        ...selectedImagesByURL,
        [currentUrl]: selectedImages.filter((img) => img !== image),
      });
    } else {
      setSelectedImagesByURL({
        ...selectedImagesByURL,
        [currentUrl]: [...selectedImages, image],
      });
    }
  };

  // 선택된 이미지의 순서를 반환하는 함수
  const getImageOrder = (image: string): number => {
    const selectedImages = selectedImagesByURL[currentUrl] || [];
    return selectedImages.indexOf(image) + 1;
  };

  // 선택 완료 시 호출
  const handleSelectionComplete = () => {
    onSelect(selectedImagesByURL[currentUrl] || []);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-lg w-full">
        {' '}
        {/* 너비 조정 */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg">이미지 선택</h2>
          <button onClick={onClose} className="btn btn-sm btn-circle">
            ×
          </button>
        </div>
        <div
          className="grid grid-cols-3 gap-2 overflow-auto"
          style={{ maxHeight: '300px' }}
        >
          {' '}
          {/* 그리드 컬럼과 최대 높이 조정 */}
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative ${selectedImagesByURL[currentUrl]?.includes(image) ? 'ring-4 ring-blue-500' : ''}`}
            >
              <img
                src={image}
                alt={`선택 가능한 이미지 ${index + 1}`}
                className="cursor-pointer"
                onClick={() => toggleImageSelection(image)}
              />
              {selectedImagesByURL[currentUrl]?.includes(image) && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  {getImageOrder(image)}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="modal-action mt-4">
          <button onClick={handleSelectionComplete} className="btn">
            선택 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImgSelectModal;

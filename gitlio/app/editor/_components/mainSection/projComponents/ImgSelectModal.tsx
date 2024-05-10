'use client';
import React, { useEffect, useState } from 'react';

interface ImageSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (selectedImages: { [url: string]: string[] }) => void;
  images: { [url: string]: string[] };
  currentUrl: string;
}

const ImgSelectModal: React.FC<ImageSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  images,
  currentUrl,
}) => {
  const [selectedImages, setSelectedImages] = useState<{
    [key: string]: string[];
  }>({});
  const [uploadedImages, setUploadedImages] = useState<{
    [key: string]: string[];
  }>({});
  const [displayImages, setDisplayImages] = useState<string[]>([]);

  useEffect(() => {
    // 현재 URL에 대한 이미지 목록 초기화 및 중복 제거 로직
    const allImages = new Set([
      ...(images[currentUrl] || []),
      ...(uploadedImages[currentUrl] || []),
    ]);
    setDisplayImages(Array.from(allImages));
  }, [currentUrl, images, uploadedImages]);

  // 이미지 선택/해제 토글 로직
  const toggleImageSelection = (image: string) => {
    const updatedSelectedImages = selectedImages[currentUrl]
      ? [...selectedImages[currentUrl]]
      : [];
    if (updatedSelectedImages.includes(image)) {
      updatedSelectedImages.splice(updatedSelectedImages.indexOf(image), 1);
    } else {
      updatedSelectedImages.push(image);
    }
    setSelectedImages({
      ...selectedImages,
      [currentUrl]: updatedSelectedImages,
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        const imageSrc = e.target?.result as string;
        // 업로드된 이미지 목록에 추가
        const newUploadedImages = [
          ...(uploadedImages[currentUrl] || []),
          imageSrc,
        ];
        setUploadedImages({
          ...uploadedImages,
          [currentUrl]: Array.from(new Set(newUploadedImages)),
        });
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

  // 선택 완료 시 호출
  const handleSelectionComplete = () => {
    // 선택 완료 시, 선택된 이미지 목록 전달
    onSelect({
      ...selectedImages,
      [currentUrl]: selectedImages[currentUrl] || [],
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-lg w-full overflow-visible">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-row items-center">
            <h2 className="text-lg mr-3">이미지 선택</h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e)}
              style={{ display: 'none' }}
              id="fileInput"
            />
            <label htmlFor="fileInput" className="btn btn-sm">
              +
            </label>
          </div>
          <button onClick={onClose} className="btn btn-sm btn-circle">
            ×
          </button>
        </div>
        <div
          className="grid grid-cols-3 gap-4 overflow-auto mb-4"
          style={{ maxHeight: '300px', padding: '10px' }}
        >
          {displayImages.map((image, index) => (
            <div
              key={index}
              className={`relative ${selectedImages[currentUrl]?.includes(image) ? 'ring-4 ring-blue-500' : ''}`}
              style={{ margin: '5px' }}
            >
              <img
                src={image}
                alt={`Preview ${index + 1}`}
                className="cursor-pointer"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                onClick={() => toggleImageSelection(image)}
              />
              {selectedImages[currentUrl]?.includes(image) && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  {selectedImages[currentUrl].indexOf(image) + 1}
                </div>
              )}
            </div>
          ))}
        </div>
        <div>
          <button onClick={handleSelectionComplete} className="btn">
            선택 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImgSelectModal;

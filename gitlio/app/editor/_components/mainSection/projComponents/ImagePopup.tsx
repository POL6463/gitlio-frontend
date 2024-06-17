import React from 'react';

interface ImagePopupProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  goToNext: () => void;
  goToPrevious: () => void;
}

const ImagePopup: React.FC<ImagePopupProps> = ({
  images,
  currentIndex,
  onClose,
  goToNext,
  goToPrevious,
}) => {
  // 모달 외부 클릭을 처리하기 위한 함수
  const handleOutsideClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-40 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="relative w-auto max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-xl flex items-center">
        <button
          onClick={goToPrevious}
          disabled={images.length <= 1}
          className="absolute left-0 p-3 text-white text-xl bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full"
        >
          &lt;
        </button>
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="block h-auto mx-auto"
          style={{ width: '600px' }} // 이미지의 가로 길이를 600px로 고정
        />
        <button
          onClick={goToNext}
          disabled={images.length <= 1}
          className="absolute right-0 p-3 text-white text-xl bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ImagePopup;

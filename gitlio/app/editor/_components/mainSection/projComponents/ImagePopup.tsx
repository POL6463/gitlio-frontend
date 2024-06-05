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
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
    <div className="relative w-auto max-w-3xl mx-auto">
      <button
        onClick={onClose}
        className="absolute top-0 right-0 p-2 text-white text-3xl z-50"
      >
        &times;
      </button>
      <div className="flex items-center justify-between">
        <button
          onClick={goToPrevious}
          disabled={images.length <= 1}
          className="p-3 text-white text-xl bg-gray-800 bg-opacity-50 hover:bg-opacity-75"
        >
          &lt;
        </button>
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="block max-h-[80vh] max-w-full mx-auto"
        />
        <button
          onClick={goToNext}
          disabled={images.length <= 1}
          className="p-3 text-white text-xl bg-gray-800 bg-opacity-50 hover:bg-opacity-75"
        >
          &gt;
        </button>
      </div>
    </div>
  </div>
);

export default ImagePopup;

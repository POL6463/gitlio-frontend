// 'use client';

import React from 'react';

const LoadingModal = () => {
  return (
    <div>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">
            AI 연산 진행 중입니다
            <span className="loading loading-dots loading-md ml-2 mt-1"></span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;

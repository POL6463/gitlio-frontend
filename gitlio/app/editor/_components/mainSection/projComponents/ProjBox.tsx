'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { Data } from '@/app/editor/(interface)/ProjectData';
import { BsArrowDownLeftSquare } from 'react-icons/bs';
import GithubLinkButton from './GithubLinkBtn';

function ProjBox({ data }: { data: Data }) {
  // 이미지 배열 확인하고 비어있으면 기본 이미지로 설정
  const images =
    data.images && data.images.length > 0
      ? data.images
      : ['https://i.ibb.co/kXW1Zjq/empty.png'];

  // 이미지 배열의 길이에 따라 초기 인덱스 설정
  const [currentImageIndex, setCurrentImageIndex] = useState(
    images.length > 0 ? 0 : -1
  );

  const goToPreviousImage = () => {
    if (images.length > 1) {
      // 두 개 이상의 이미지가 있을 때만 작동
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };

  const goToNextImage = () => {
    if (images.length > 1) {
      // 두 개 이상의 이미지가 있을 때만 작동
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  return (
    <div className="flex border border-gray-300 shadow-lg rounded-lg p-4 m-8 w-[700px] relative">
      <div className="flex-none relative w-2/5 h-80 bg-gray-200 rounded-lg">
        {images.length > 0 && (
          <img
            src={images[currentImageIndex]}
            alt={`Project Image ${currentImageIndex + 1}`}
            className="max-w-full max-h-full w-auto h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain"
          />
        )}
        <button
          onClick={goToPreviousImage}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full"
          disabled={images.length <= 1}
        >
          &lt;
        </button>
        <button
          onClick={goToNextImage}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full"
          disabled={images.length <= 1}
        >
          &gt;
        </button>
      </div>
      <div className="flex-1 pl-4 w-3/5 flex flex-col justify-between">
        <div>
          <div className="flex flex-row items-center">
            <h2 className="text-2xl font-bold">{data.title || 'No Title'}</h2>
            {data.serviceUrl && ( // serviceUrl이 존재하는 경우에만 렌더링
              <div className="tooltip ml-2" data-tip="서비스로 이동">
                <Link href={data.serviceUrl}>
                  <BsArrowDownLeftSquare />
                </Link>
              </div>
            )}
          </div>
          <p className="mb-4">{data.intro || 'No Introduction'}</p>
          <div className="border-2 border-gray-300 rounded-lg p-3 mb-4">
            <p className="font-semibold">주요 개발 내용</p>
            <ul className="list-disc pl-5">
              {data.sentences && data.sentences.length > 0 ? (
                data.sentences.map((sentence, index) => (
                  <li key={index} className="text-sm mb-1">
                    {sentence}
                  </li>
                ))
              ) : (
                <li className="text-sm mb-1">
                  No development details available.
                </li>
              )}
            </ul>
          </div>
        </div>
        {data.url && <GithubLinkButton url={data.url} />}
      </div>
    </div>
  );
}

export default ProjBox;

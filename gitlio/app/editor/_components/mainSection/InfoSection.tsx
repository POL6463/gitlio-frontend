'use client';

import React, { useState } from 'react';
import { Data } from '../../(interface)/InfoData';
import InfoTagList from './infoComponents/InfoTagList';

const infoData: Data = {
  title: '준영이의 포트폴리오',
  profileImage: '/gdsc.jpg',
  infoContent:
    'End-to-End 프로젝트에서 팀 리더를 맡아 React를 중심으로 한 프론트엔드 개발을 주도한 경험이 있습니다',
  tagList: ['#Front Enginner', '#Next.js', '#React.js'],
};

export default function InfoSection() {
  const [infoContent, setInfoContent] = useState<string>(infoData.infoContent);
  const [infoImage, setInfoImage] = useState<string>(infoData.profileImage);

  const handleInfoContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    setInfoContent(e.currentTarget.textContent || '');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement)?.files;
    if (files && files.length > 0) {
      const file = files[0];
      setInfoImage(file.name);
    }
  };

  return (
    <div className="flex flex-row justify-between bg-white mt-10 rounded-3xl p-10">
      <div className="flex flex-col items-center h-full mr-10">
        <h1 className="text-3xl font-medium mx-10 mt-10">#Introduction</h1>
        <div className="w-[244px] h-[160px] px-10 my-10 bg-cover bg-center">
          <img
            className="w-full h-full rounded-full"
            src={infoImage}
            alt="junyoung"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e)}
          style={{ display: 'none' }}
          id="fileInput"
        />
        <label htmlFor="fileInput" className="btn">
          이미지 수정
        </label>
      </div>
      <div className="flex flex-col items-center justify-around mr-10">
        <div className="flex flex-row font-bold text-2xl mt-10">
          {infoData.title || ''}
        </div>
        <div className="flex flex-row justify-between">
          {infoData.tagList.map((data, index) => (
            <InfoTagList key={index} data={data} />
          ))}
        </div>
        <div
          className="w-[450px] h-[200px] border rounded-lg my-10 p-5"
          contentEditable="true"
          suppressContentEditableWarning={true}
          onInput={(e) => handleInfoContentChange(e)}
        >
          {infoContent}
        </div>
      </div>
    </div>
  );
}

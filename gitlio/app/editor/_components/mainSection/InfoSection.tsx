'use client';

import React, { useState } from 'react';
import { Data } from '../../(interface)/InfoData';
import InfoTagList from './infoComponents/InfoTagList';

const infoData: Data = {
  title: '준영이의 포트폴리오',
  profileImage: '/gitlio.jpg',
  infoContent:
    'End-to-End 프로젝트에서 팀 리더를 맡아 React를 중심으로 한 프론트엔드 개발을 주도한 경험이 있습니다',
  tagList: ['#Front Enginner', '#Next.js', '#React.js'],
};

function InfoSection() {
  const [infoContent, setIntroContent] = useState<string>(infoData.infoContent);

  return (
    <div className="flex flex-row justify-between bg-white mt-10 rounded-3xl p-10">
      <div className="flex flex-col items-center h-full mr-10">
        <h1 className="text-3xl font-medium mx-10 mt-10">#Introduction</h1>
        <div className="w-[244px] h-[160px] px-10 my-10 bg-cover bg-center">
          <img
            className="w-full h-full rounded-full"
            src="/gdsc.jpg"
            alt="junyoung"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-around mr-10">
        <div className="flex flex-row font-bold text-2xl">
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
        >
          {infoContent}
        </div>
      </div>
    </div>
  );
}

export default InfoSection;

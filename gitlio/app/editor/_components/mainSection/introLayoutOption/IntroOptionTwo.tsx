'use client';

import React, { useEffect, useRef } from 'react';
import { ProfileState } from '@/store/introSidebarStore'; // 적절한 경로로 변경해주세요
import IntroTagList from '../introComponents/IntroTagList';
import useLayoutStore from '@/store/layoutDesignStore';

interface IntroOptionProps {
  profile: ProfileState;
}

const IntroOptionTwo: React.FC<IntroOptionProps> = ({ profile }) => {
  const { intro } = useLayoutStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      const element = textareaRef.current;
      element.style.height = 'auto'; // 높이를 초기화
      element.style.height = `${element.scrollHeight}px`; // scrollHeight를 기준으로 높이 설정
    }
  }, [profile.introDescription, intro.option]);

  return (
    <div className="flex w-full justify-between flex-row-reverse">
      <div className="flex flex-col items-start h-full">
        <div className="w-[244px] h-[160px] px-10 my-10 flex items-center justify-center">
          {profile.profileImage ? (
            <img
              className="w-full h-full rounded-full object-fill"
              src={profile.profileImage}
              alt="Profile"
            />
          ) : (
            <div className="w-full h-full rounded-full flex items-center justify-center bg-gray-300">
              <span className="text-gray-500">Profile</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-around mr-0">
        <div className="flex flex-row w-full justify-end font-bold text-2xl mt-10">
          {profile.title || 'insert your title'}
        </div>
        <div className="flex flex-row w-full justify-end mt-5">
          {profile.tagList?.map((tag, index) => (
            <IntroTagList key={index} data={tag} />
          ))}
        </div>
        <textarea
          ref={textareaRef}
          className="w-[400px] text-center text-white border rounded-2xl my-10 p-5 bg-[#374151] overflow-hidden"
          value={profile.introDescription}
          readOnly={true}
          style={{ pointerEvents: 'none' }}
        />
      </div>
    </div>
  );
};

export default IntroOptionTwo;

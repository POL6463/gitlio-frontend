'use client';

import React, { useEffect, useRef } from 'react';
import { ProfileState } from '@/store/introSidebarStore'; // 적절한 경로로 변경해주세요
import IntroTagList from '../introComponents/IntroTagList';
import useLayoutStore from '@/store/layoutDesignStore';

interface IntroOptionProps {
  profile: ProfileState;
}

const IntroOptionThree: React.FC<IntroOptionProps> = ({ profile }) => {
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
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="flex flex-col items-start h-full mr-15">
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
        <div className="flex flex-col justify-start w-full py-6 ml-6">
          <div className="flex flex-row w-full justify-start font-bold text-2xl mt-10">
            {profile.title || 'insert your title'}
          </div>
          <div className="flex flex-row justify-start w-full mt-5">
            {profile.tagList?.map((tag, index) => (
              <IntroTagList key={index} data={tag} />
            ))}
          </div>
        </div>
      </div>
      <div className="textarea whitespace-pre-wrap flex min-h-[80px] px-4 w-9/10 mx-6 text-center items-center justify-center text-white border rounded-2xl bg-[#374151] overflow-y-auto">
        {profile.introDescription}
      </div>
    </div>
  );
};

export default IntroOptionThree;

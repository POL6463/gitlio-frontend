'use client';

import React, { useEffect, useRef } from 'react';
import IntroSidebarStore from '@/store/introSidebarStore';
import IntroTagList from './introComponents/IntroTagList';

export default function IntroSection() {
  const { profile } = IntroSidebarStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      const element = textareaRef.current;
      element.style.height = 'inherit';
      element.style.height = `${element.scrollHeight}px`;
    }
  }, [profile.introDescription]);

  return (
    <div className="flex flex-row w-[800px] justify-between bg-white mt-10 rounded-3xl p-10">
      <div className="flex flex-col items-center h-full mr-10">
        <h1 className="text-3xl font-semibold ml-10 mr-5">#Introduction</h1>
        <div className="w-[244px] h-[160px] px-10 my-10 bg-cover bg-center rounded-full flex items-center justify-center">
          {profile.profileImage ? (
            <img
              className="w-full h-full rounded-full text-center"
              src={profile.profileImage}
              alt="Profile"
            />
          ) : (
            <div className="w-full h-full rounded-full text-center flex items-center justify-center bg-gray-300">
              <span className="text-gray-500">Profile</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-around mr-10">
        {profile.title ? (
          <div className="flex flex-row w-full justify-start font-bold text-2xl mt-10">
            {profile.title}
          </div>
        ) : (
          <div className="flex flex-row w-full justify-start font-bold text-zinc-300 text-2xl mt-10">
            {'insert your title'}
          </div>
        )}

        <div className="flex flex-row justify-start w-full mt-5">
          {profile.tagList?.map((tag, index) => (
            <IntroTagList key={index} data={tag} />
          ))}
        </div>
        <textarea
          ref={textareaRef}
          className="w-[400px] h-[160px] min-h-[180px] text-center text-white border rounded-2xl my-10 p-5 bg-[#374151] resize-none overflow-hidden"
          value={profile.introDescription}
          readOnly={true}
          style={{ pointerEvents: 'none' }}
        />
      </div>
    </div>
  );
}

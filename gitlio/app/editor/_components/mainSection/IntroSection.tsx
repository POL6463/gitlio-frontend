'use client';

import React, { useEffect, useRef } from 'react';
import IntroSidebarStore from '@/store/introSidebarStore';
import IntroTagList from './introComponents/IntroTagList';
import useDesignStore from '@/store/layoutDesignStore';

export default function IntroSection() {
  const { profile } = IntroSidebarStore();
  const { layoutOption } = useDesignStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      const element = textareaRef.current;
      element.style.height = 'inherit';
      element.style.height = `${element.scrollHeight}px`;
    }
  }, [profile.introDescription]);

  return (
    <div className="flex flex-col w-[800px] bg-white mt-10 rounded-3xl p-10">
      <div className="flex flex-row items-center mb-5">
        <h1 className="text-3xl font-semibold mr-5">#Introduction</h1>
      </div>
      <div
        className={`flex w-full justify-between ${layoutOption === 'option2' ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <div className="flex flex-col items-start h-full">
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
        <div
          className={`flex flex-col items-center justify-around ${layoutOption === 'option2' ? 'mr-0' : 'mr-10'}`}
        >
          {profile.title ? (
            <div
              className={`flex flex-row w-full ${layoutOption === 'option2' ? 'justify-end' : 'justify-start'} font-bold text-2xl mt-10`}
            >
              {profile.title}
            </div>
          ) : (
            <div
              className={`flex flex-row w-full ${layoutOption === 'option2' ? 'justify-end' : 'justify-start'} font-bold text-2xl mt-10`}
            >
              {'insert your title'}
            </div>
          )}

          <div
            className={`flex flex-row w-full ${layoutOption === 'option2' ? 'justify-end' : 'justify-start'} mt-5`}
          >
            {profile.tagList?.map((tag, index) => (
              <IntroTagList key={index} data={tag} />
            ))}
          </div>
          <textarea
            ref={textareaRef}
            className="w-[400px] h-[100px] min-h-[100px] text-center text-white border rounded-2xl my-10 p-5 bg-[#374151] resize-none overflow-hidden"
            value={profile.introDescription}
            readOnly={true}
            style={{ pointerEvents: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}
